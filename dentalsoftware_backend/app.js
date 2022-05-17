var express = require('express');
var mysql = require('mysql'); 
var app = express();

var client;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
                return 1
            }
        }
        if (res) {
            res.send({result: 0})
        } else {
            return 0
        }
    });
}

function databaseCreateTables(res = null) {
    var sql = "CREATE TABLE patient_data (ID INT AUTO_INCREMENT PRIMARY KEY, NHI VARCHAR(255), FirstName VARCHAR(255), LastName VARCHAR(255), MiddleName VARCHAR(255), DOB DATE)";
    databaseQuery(res, sql)
    sql = "CREATE TABLE bookings (ID INT AUTO_INCREMENT PRIMARY KEY, Date date, Patient int, Notes VARCHAR(255), FOREIGN KEY (Patient) REFERENCES patient_data(ID))";
    databaseQuery(res, sql)
    sql = "CREATE TABLE accounts (ID INT AUTO_INCREMENT PRIMARY KEY, AccountName VARCHAR(255), AccountPasswordHash VARCHAR(255), AccountPasswordSalt VARCHAR(255), AccountAccessLevel INT)";
    databaseQuery(null, sql) 
}

module.exports = app;
