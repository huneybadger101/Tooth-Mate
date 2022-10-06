const express = require('express');
const quotesRouter = express.Router();
const { databaseQuery } = require('../helpers/db');

let qClient;

function setQClient(client) {
    qClient = client;
}

quotesRouter.post('/getAllQuotes', (req, res) => {
    let searchItem = "*";
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM quotes";
    databaseQuery(res, sql);
})

quotesRouter.post('/deleteQuote', (req, res) => {

    let quoteID = req.headers['quoteid'];
    let sql = "DELETE FROM quotes WHERE ID = '" + quoteID + "';";
    databaseQuery(res, sql);

})

quotesRouter.post('/deleteAllQuotesForPatient', (req, res) => {

    let patientID = req.headers['patientid'];
    let sql = "DELETE FROM quotes WHERE PATIENT = '" + patientID + "';";
    databaseQuery(res, sql);

})

quotesRouter.post('/createNewQuote', (req, res) => {
    let json = JSON.parse(req.headers['data'])
    createNewQuote(res, json)
})

quotesRouter.post('/updateQuote', (req, res) => {

    let quoteID = req.headers['quoteid'];
    let cols = JSON.parse(req.headers['cols'])['cols'];
    let vals = JSON.parse(req.headers['vals'])['vals'];

    let setString = "";

    for (let i = 0; i < cols.length; i++) {
        setString += cols[i] + " = '" + vals[i] + "', ";
    }

    setString = setString.slice(0,  -2)

    let sql = "UPDATE quotes SET " + setString + " WHERE ID = '" + quoteID + "';";
    databaseQuery(res, sql);

})

function createNewQuote(res = null, quoteData) {

    let numMissing = 0
    let errorMessage = "Error: Missing "
    if (quoteData.patientID === undefined) {
        errorMessage += "Patient ID, "
        numMissing++
    }
    if (quoteData.dentistID === undefined) {
        errorMessage += "Dentist ID, "
        numMissing++
    }
    if (quoteData.bookingID === undefined) {
        errorMessage += "Booking ID, "
        numMissing++
    }

    if (quoteData.totalCostDollars === undefined) {
        errorMessage += "Total Cost (Dollars), "
        numMissing++
    }

    if (numMissing > 0) {
        errorMessage = errorMessage.slice(0, -2) + "."
        res.send({result: 1, error: errorMessage})
        return
    }

    let sql = "SELECT * FROM quotes WHERE Booking='" + quoteData.bookingID + "'"
    qClient.query(sql, function (err, result) {
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

            if (res) {
                res.send({result: 1, error: "A quote for the given Booking already exists!"})
                return
            } else {
                return {result: 1, error: "A quote for the given Booking already exists!"}
            }
        }

        sql = "INSERT INTO `quotes` (`Patient`, `Dentist`, `Booking`, `QuoteCreationDate`, `QuotePaymentStatus`, `QuotePaymentDeadline`, `QuoteTotalCostDollars`, `QuoteTotalCostCents`) "
        + "VALUES (" + quoteData.patientID + ", " + quoteData.dentistID + ", " + quoteData.bookingID + ", '" + new Date().toISOString().slice(0, 19).replace('T', ' ') + "', 'UNPAID', '" + addDays(new Date(), 30).toISOString().slice(0, 19).replace('T', ' ') + "', " + quoteData.totalCostDollars + ", " + (quoteData.totalCostCents != undefined ? quoteData.totalCostCents : 0) + ")"
    
        databaseQuery(res, sql)
    });

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}


module.exports = {quotesRouter, setQClient};