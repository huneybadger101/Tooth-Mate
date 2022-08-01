const express = require('express');
const mysql = require('mysql'); 
const app = express();

let client;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/getAllPatientData', (req, res) => {
    let searchItem = "*";
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM patient_data";
    databaseQuery(res, sql);
})

app.post('/deletePatientData', (req, res) => {

    let NHINumber = req.headers['nhinumber'];
    let sql = "DELETE FROM patient_data WHERE NHI = '" + NHINumber + "';";
    databaseQuery(res, sql);

})

app.post('/updatePatientData', (req, res) => {

    let NHINumber = req.headers['nhinumber'];
    let cols = JSON.parse(req.headers['cols'])['cols'];
    let vals = JSON.parse(req.headers['vals'])['vals'];

    let setString = "";

    for (let i = 0; i < cols.length; i++) {
        setString += cols[i] + " = '" + vals[i] + "', ";
    }

    setString = setString.slice(0,  -2)

    let sql = "UPDATE patient_data SET " + setString + " WHERE NHI = '" + NHINumber + "';";
    databaseQuery(res, sql);

})

app.get('/getAllBookings', (req, res) => {
    let searchItem = "*";
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM bookings";
    databaseQuery(res, sql);
})

app.post('/deleteBooking', (req, res) => {
    
    let bookingID = req.headers['bookingid'];
    let sql = "DELETE FROM bookings WHERE ID = '" + bookingID + "';";
    databaseQuery(res, sql);

})

app.post('/updateBooking', (req, res) => {

    let bookingID = req.headers['bookingid'];
    let cols = JSON.parse(req.headers['cols'])['cols'];
    let vals = JSON.parse(req.headers['vals'])['vals'];

    let setString = "";

    for (let i = 0; i < cols.length; i++) {
        setString += cols[i] + " = '" + vals[i] + "', ";
    }

    setString = setString.slice(0,  -2)

    let sql = "UPDATE bookings SET " + setString + " WHERE ID = '" + bookingID + "';";
    databaseQuery(res, sql);

})

app.get('/getAllAccounts', (req, res) => {
    let searchItem = "*";
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM accounts";
    databaseQuery(res, sql);
})

app.post('/deleteAccount', (req, res) => {

    let accountID = req.headers['accountid'];
    let sql = "DELETE FROM accounts WHERE ID = '" + accountID + "';";
    databaseQuery(res, sql);
    
})

app.post('/updateAccount', (req, res) => {

    let accountID = req.headers['accountid'];
    let cols = JSON.parse(req.headers['cols'])['cols'];
    let vals = JSON.parse(req.headers['vals'])['vals'];

    let setString = "";

    for (let i = 0; i < cols.length; i++) {
        setString += cols[i] + " = '" + vals[i] + "', ";
    }

    setString = setString.slice(0,  -2)

    let sql = "UPDATE accounts SET " + setString + " WHERE ID = '" + accountID + "';";
    databaseQuery(res, sql);

})

app.post('/createNewPatient', (req, res) => {
    let json = JSON.parse(req.headers['data'])['data']
    createNewPatient(res, json)
})

function databaseConnect(host = "localhost", username = "root", password = null, database = "toothmate", port = 3306) {
    client = mysql.createConnection({
        host: host,
        user: username,
        port: port,
        ...(password != null && {password: password}), // Will change, no password for testing
        database: database
      });
}

function databaseQuery(res = null, query) {
    client.query(query, function (err, result) {
        if (err) {
            console.log(err)
            if (res) {
                res.send({result: 1, error: err})
            } else {
                return {result: 1}
            }
        }
        if (res) {
            res.send({result: result})
        } else {
            return {result: result}
        }
    });
}

function createNewPatient(res = null, patientData) {
    let numMissing = 0
    let errorMessage = "Error: Missing "
    if (patientData.patient_NHI === undefined) {
        errorMessage += "Patient NHI Number, "
        numMissing++
    }
    if (patientData.patient_First_Name === undefined) {
        errorMessage += "Patient First Name, "
        numMissing++
    }
    if (patientData.patient_Last_Name === undefined) {
        errorMessage += "Patient Last Name, "
        numMissing++
    }
    if (patientData.patient_DOB === undefined) {
        errorMessage += "Patient Date of Birth, "
        numMissing++
    }
    if (patientData.patient_Contact_Number === undefined) {
        errorMessage += "Patient Contact Number, "
        numMissing++
    }
    if (patientData.patient_Email_Address === undefined) {
        errorMessage += "Patient Email Address, "
        numMissing++
    }

    if (numMissing > 0) {
        errorMessage = errorMessage.slice(0, -2) + "."
        res.send({result: 1, error: errorMessage})
        return
    }
    // No missing data, time to check if patient already exists
    let sql = "SELECT * FROM patient_data WHERE NHI='" + patientData.patient_NHI + "'"
    let patientExists = 0
    client.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            if (res) {
                res.send({result: 1, error: err})
                return
            } else {
                return {result: 1, error: err}
            }
        }
        patientExists = Object.keys(result).length

        if (patientExists > 0) {
            if (res) {
                res.send({result: 1, error: "Patient with given NHI number already exists!"})
                return
            } else {
                return {result: 1, error: "Patient with given NHI number already exists!"}
            }
        }
        // Verified that patient doesn't already exist, time to add them
        sql = "INSERT INTO patient_data (NHI, FirstName, " + (patientData.patient_Middle_Name != undefined ? "MiddleName, " : "") + "LastName, DOB, ContactNumber, Email" + (patientData.patient_Notes != undefined ? ", Notes" : " ") + ") " 
        + "VALUES ('" 
        + patientData.patient_NHI + "', " 
        + "'" + patientData.patient_First_Name + "', " 
        + (patientData.patient_Middle_Name != undefined ? "'" + patientData.patient_Middle_Name +"', " : "") 
        + "'" + patientData.patient_Last_Name + "', " 
        + "'" + patientData.patient_DOB + "', "
        + "'" + patientData.patient_Contact_Number + "', " 
        + "'" + patientData.patient_Email_Address + "'"
        + (patientData.patient_Notes != undefined ? ", '" + patientData.patient_Notes + "'" : "") 
        + ")"
    
        databaseQuery(res, sql)
    });
}

function databaseCreateTables(res = null) {
    let sql = "CREATE TABLE IF NOT EXISTS patient_data (ID INT AUTO_INCREMENT PRIMARY KEY, NHI VARCHAR(255), FirstName VARCHAR(255), LastName VARCHAR(255), MiddleName VARCHAR(255), DOB DATE, ContactNumber VARCHAR(255), Email VARCHAR(255), Notes MEDIUMTEXT)";
    databaseQuery(res, sql)
    sql = "CREATE TABLE IF NOT EXISTS accounts (ID INT AUTO_INCREMENT PRIMARY KEY, AccountName VARCHAR(255), AccountPasswordHash VARCHAR(255), AccountPasswordSalt VARCHAR(255), AccountAccessLevel INT, DentistNumber INT, DOB DATE, Email VARCHAR(255), PhoneNumber VARCHAR(255))";
    databaseQuery(null, sql) 
    sql = "CREATE TABLE IF NOT EXISTS bookings (ID INT AUTO_INCREMENT PRIMARY KEY, Date DATE, Patient INT, Dentist INT, Type VARCHAR(255), FeeDollars INT, FeeCents INT, Location VARCHAR(255), Notes VARCHAR(255), FOREIGN KEY (Patient) REFERENCES patient_data(ID), FOREIGN KEY (Dentist) REFERENCES accounts(ID))";
    databaseQuery(res, sql)
}

databaseConnect()
// Tables are only created if they currently do not exist, will not be created on every launch
databaseCreateTables()

module.exports = app;
