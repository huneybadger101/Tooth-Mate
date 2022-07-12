var express = require('express');
var mysql = require('mysql'); 
var app = express();

var client;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/getAllPatientData', (req, res) => {
    databaseQuery(res, "select * from patient_data")
})

app.get('/getAllBookings', (req, res) => {
    databaseQuery(res, "select * from bookings")
})

app.get('/getAllAccounts', (req, res) => {
    databaseQuery(res, "select * from accounts")
})

app.post('/createNewPatient', (req, res) => {
    json = req.body
    createNewPatient(res, json)
})

function databaseConnect(res = null, host = "localhost", username = "root", password = null, database = "toothmate") {
    client = mysql.createConnection({
        host: "localhost",
        user: "root", // Will change, no password for testing
        ...(password != null && {password: password}),
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
    numMissing = 0
    errorMessage = "Error: Missing "
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
    sql = "SELECT * FROM patient_data WHERE NHI='" + patientData.patient_NHI + "'"
    patientExists = 0
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
        sql = "INSERT INTO patient_data (NHI, FirstName, " + (patientData.patient_Middle_Name != undefined ? "MiddleName, " : "") + "LastName, DOB, ContactNumber, Email) " 
        + "VALUES ('" 
        + patientData.patient_NHI + "', " 
        + "'" + patientData.patient_First_Name + "', " 
        + (patientData.patient_Middle_Name != undefined ? "'" + patientData.patient_Middle_Name +"', " : "") 
        + "'" + patientData.patient_Last_Name + "', " 
        + "'" + patientData.patient_DOB + "', "
        + "'" + patientData.patient_Contact_Number + "', " 
        + "'" + patientData.patient_Email_Address + "')"
    
        databaseQuery(res, sql)
    });
}

function prepareDatabaseQuery(query) {
    return client.escape(query)
}

function databaseCreateTables(res = null) {
    var sql = "CREATE TABLE IF NOT EXISTS patient_data (ID INT AUTO_INCREMENT PRIMARY KEY, NHI VARCHAR(255), FirstName VARCHAR(255), LastName VARCHAR(255), MiddleName VARCHAR(255), DOB DATE, ContactNumber VARCHAR(255), Email VARCHAR(255))";
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
