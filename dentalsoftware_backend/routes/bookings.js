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
    for (let i = 0; i < bookingData.data.length; i++) {
        if (bookingData.data[i].patientID === undefined) {
            errorMessage += "Patient ID (" + i + "), "
            numMissing++
        }
        if (bookingData.data[i].date === undefined) {
            errorMessage += "Date (" + i + "), "
            numMissing++
        }
        if (bookingData.data[i].time === undefined) {
            errorMessage += "Time (" + i + "), "
            numMissing++
        }
        if (bookingData.data[i].dentistID === undefined) {
            errorMessage += "Dentist ID (" + i + "), "
            numMissing++
        }
        if (bookingData.data[i].dentistID == null) {
            bookingData.data[i].dentistID = 1;
        }
        if (bookingData.data[i].procedure == undefined) {
            errorMessage += "Procedure Name (" + i + "), "
            numMissing++
        }
        if (bookingData.data[i].procedureTime == undefined) {
            errorMessage += "Procedure Time (" + i + "), "
            numMissing++    
        }
        if (bookingData.data[i].procedureCost == undefined) {
            errorMessage += "Prodecure Cost (" + i + "), "
            numMissing++    
        }
        if (bookingData.data[i].tooth == undefined) {
            errorMessage += "Tooth (" + i + "), "
            numMissing++    
        }
    }

    if (numMissing > 0) {
        errorMessage = errorMessage.slice(0, -2) + "."
        res.send({result: 1, error: errorMessage})
        return
    }

    let finalsql = "INSERT INTO `bookings` (`Date`, `Time`, `Patient`, `Dentist`, `Tooth`, `FeeDollars`, `FeeCents`, `Notes`, `ProcedureName`, `ProcedureTime`, `PatientAttended`) "
    + "VALUES "

    for (let i = 0; i < bookingData.data.length; i++) {

        let newDate = new Date(bookingData.data[i].date).toISOString().split("T")[0];

        let splitTime = bookingData.data[i].time.split(":");
        let hour = splitTime[0];
        let minute = splitTime[1].slice(0, -2);

        let newTime = (hour * 60) + minute;

        let dollars = Number(bookingData.data[i].procedureCost.split("$")[1].split(".")[0]);
        let cents = Number(bookingData.data[i].procedureCost.split("$")[1].split(".")[1]);

        if (bookingData.data[i].dentistID == 0) {bookingData.data[i].dentistID++}

        finalsql += "('" + newDate + "', '" + newTime + "', '" + bookingData.data[i].patientID + "', '" + bookingData.data[i].dentistID + "', '" + bookingData.data[i].tooth + "','" + dollars + "', '" + cents + "', '" + bookingData.data[i].notes + "', '" + bookingData.data[i].procedure + "', '" + bookingData.data[i].procedureTime + "', 'DATEBEFOREBOOKING'), "

    }

    finalsql = finalsql.slice(0, -2);
    try {
        bClient.query(finalsql, function (err, result) {
            if (err) {
                console.log(err)
                if (res) {
                    res.send({result: 1, error: err})
                    return
                } else {
                    return {result: 1, error: err}
                }
            }
            if (res) {
                res.send({result: 0})
                return
            } else {
                return {result: 0}
            }
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    
}

module.exports = {bookingsRouter, setBClient};