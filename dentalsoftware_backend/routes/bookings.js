const express = require('express');
const bookingsRouter = express.Router();
const { databaseQuery } = require('../helpers/db');

let bClient;

function setBClient(client) {
    bClient = client;
}

bookingsRouter.post('/getAllBookings', (req, res) => {
    let searchItem = "*";
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM bookings";
    databaseQuery(res, sql);
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
        errorMessage += "Procedure, "
        numMissing++
    }
    
    if (bookingData.affectedAreas === undefined) {
        errorMessage += "Affected Areas, "
        numMissing++
    }

    if (bookingData.PatientAttended === undefined) {
        errorMessage += "Patient Attended Status, "
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

        sql = "INSERT INTO `bookings` (`Date`, `Time`, `Patient`, `Dentist`, `FeeDollars`, `FeeCents`, `Location`, `Notes`, `ProcedureName`, `AffectedAreas`. `PatientAttended`) "
        + "VALUES ('" + newDate + "', '" + newTime + "', '" + bookingData.patientID + "', '" + bookingData.dentistID + "', '100', '99', 'Default Location', '" + bookingData.notes + "', '" + bookingData.procedure + "', '" + bookingData.affectedAreas + "', '" + bookingData.PatientAttended + "')"
        databaseQuery(res, sql)
    });
}

module.exports = {bookingsRouter, setBClient};