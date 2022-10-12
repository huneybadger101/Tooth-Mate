const express = require('express');
const bookingsRouter = express.Router();
const { databaseQuery } = require('../helpers/db');

let bClient;

function setBClient(client) {
    bClient = client;
}

function getBookingDataByID(id, res) {
    let bookingID = id;

    let bookingData;
    let bookingDentalChartsData;

    let sql = "SELECT * FROM bookings WHERE ID = '" + bookingID + "';"
    try {
        bClient.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                if (res) {
                    res.send({result: 1, error: err})
                } else {
                    return {result: 1}
                }
            }

            bookingData = result;

            sql = "SELECT * FROM dental_charts WHERE Booking = '" + bookingID + "';"
            bClient.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                    if (res) {
                        res.send({result: 1, error: err})
                    } else {
                        return {result: 1}
                    }
                }
        
                bookingDentalChartsData = result;
                let bookingDentalChartsDataParsed = [];
                for (let i = 0; i < bookingDentalChartsData.length; i++) {
                    bookingDentalChartsDataParsed.push({
                        Data: JSON.parse(bookingDentalChartsData[i]['Data']),
                        ID: bookingDentalChartsData[i]['ID'],
                        Booking: bookingDentalChartsData[i]['Booking'],
                        })
                }
        
                res.send({
                    result: {
                        bookingData,
                        bookingDentalChartsData: bookingDentalChartsDataParsed
                    }
                })
        
            });
        });
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    
}

bookingsRouter.post('/getAllBookings', (req, res) => {
    let searchItem = "*";
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM bookings";
    databaseQuery(res, sql);
})

bookingsRouter.post('/getBookingDataByID', async (req, res) => {
    let id = req.headers['id'];
    getBookingDataByID(id, res)
})

bookingsRouter.post('/deleteBooking', (req, res) => {
    
    let bookingID = req.headers['bookingid'];
    let sql = "DELETE FROM bookings WHERE ID = '" + bookingID + "';";
    databaseQuery(res, sql);

})

bookingsRouter.post('/createNewBooking', (req, res) => {
    let json = JSON.parse(req.headers['data'])
    createNewBooking(res, json)
})


bookingsRouter.post('/updateBooking', (req, res) => {

    let bookingID = req.headers['bookingid'];
    let cols = JSON.parse(req.headers['cols']);
    let vals = JSON.parse(req.headers['vals']);

    let setString = "";

    for (let i = 0; i < cols.length; i++) {
        setString += cols[i] + " = '" + vals[i] + "', ";
    }

    setString = setString.slice(0,  -2)

    let sql = "UPDATE bookings SET " + setString + " WHERE ID = '" + bookingID + "';";
    databaseQuery(res, sql);

})

function createNewBooking(res = null, bookingData) {
    let numMissing = 0
    let errorMessage = "Error: Missing "
    if (bookingData.patientID === undefined) {
        errorMessage += "Patient ID, "
        numMissing++
    }
    if (bookingData.date === undefined) {
        errorMessage += "Date, "
        numMissing++
    }
    if (bookingData.time === undefined) {
        errorMessage += "Time, "
        numMissing++
    }
    if (bookingData.dentistID === undefined) {
        errorMessage += "Dentist ID, "
        numMissing++
    }
    if (bookingData.procedure === undefined) {
        bookingData.procedure = "Initial Examination"
    }
    if (bookingData.dentalCharts === undefined) {
        errorMessage += "Dental Chart(s), "
        numMissing++
    }

    let newDate = bookingData.date;

    let splitTime = bookingData.time.split(":");
    let newTime = splitTime[0] + ":" + splitTime[1].slice(0, -2) + ":00";
    let hour = splitTime[0];
    let minute = splitTime[1].slice(0, -2);

    if (numMissing > 0) {
        errorMessage = errorMessage.slice(0, -2) + "."
        res.send({result: 1, error: errorMessage})
        return
    }

    let sql = "SELECT * FROM bookings WHERE Date='" + newDate + "'"
    try {
        bClient.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                if (res) {
                    res.send({result: 1, error: err})
                    return
                } else {
                    return {result: 1, error: err}
                }
            }

            if (Object.keys(result).length > 0) {

                for (let i = 0; i < Object.keys(result).length; i++) {
                    let tempHour = result[i]['Time'].split(":")[0]
                    let tempMin = result[i]['Time'].split(":")[1]

                    let tempTime = (tempHour * 60) + tempMin;
                    let newTime = (hour * 60) + minute;

                    let diff = Math.abs(tempTime - newTime);

                    if (diff < 90) {
                        if (res) {
                            res.send({result: 1, error: "Booking already exists within 90 minutes of the given time/date!"})
                            return
                        } else {
                            return {result: 1, error: "Booking already exists within 90 minutes of the given time/date!"}
                        }
                    }
                }
            }

            let dollars = 0;
            let cents = 0;

            if (bookingData.dentistID == 0) {bookingData.dentistID++}

            for (let i = 0; i < bookingData.dentalCharts.length; i++) {
                dollars += Number(bookingData.dentalCharts[i]['procedureCost'].split("$")[1].split(".")[0])
                cents += Number(bookingData.dentalCharts[i]['procedureCost'].split("$")[1].split(".")[1])

                while (cents >= 100) {
                    dollars++
                    cents -= 100
                }
            }

            sql = "INSERT INTO `bookings` (`Date`, `Time`, `Patient`, `Dentist`, `FeeDollars`, `FeeCents`, `Location`, `Notes`, `ProcedureName`, `PatientAttended`) "
            + "VALUES ('" + newDate + "', '" + newTime + "', '" + bookingData.patientID + "', '" + bookingData.dentistID + "', '" + dollars + "', '" + cents + "', 'Default Location', '" + bookingData.notes + "', '" + bookingData.procedure + "', 'DATEBEFOREBOOKING')"
            bClient.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                    if (res) {
                        res.send({result: 1, error: err})
                        return
                    } else {
                        return {result: 1, error: err}
                    }
                }

                sql = "SELECT * FROM bookings ORDER BY id DESC LIMIT 1";
                bClient.query(sql, function (err, result) {
                    if (err) {
                        console.log(err)
                        if (res) {
                            res.send({result: 1, error: err})
                            return
                        } else {
                            return {result: 1, error: err}
                        }
                    }
                    let bookingID = result[0]['ID'];
                    sql = "INSERT INTO `dental_charts` (`Booking`, `Data`) VALUES "

                    for (let i = 0; i < bookingData.dentalCharts.length; i++) {
                        sql += "(" + bookingID + ", '" + JSON.stringify(bookingData.dentalCharts[i]) + "'), ";
                    }
                    sql = sql.slice(0, -2)
                    sql += ";";
                    databaseQuery(res, sql);
                })
                
            })
        });
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    
}

module.exports = {bookingsRouter, setBClient};