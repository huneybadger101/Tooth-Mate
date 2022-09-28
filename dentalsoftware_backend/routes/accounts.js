const express = require('express');
const accountsRouter = express.Router();
const { databaseQuery } = require('../helpers/db');
const { sha256, makeid } = require('../helpers/accountsHelper');

let aClient;

function setAClient(client) {
    aClient = client;
}

accountsRouter.post('/getAllAccounts', (req, res) => {
    let searchItem = "*";
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM accounts";
    databaseQuery(res, sql);
})

accountsRouter.post('/deleteAccount', (req, res) => {

    let accountID = req.headers['accountid'];
    let sql = "DELETE FROM accounts WHERE ID = '" + accountID + "';";
    databaseQuery(res, sql);
    
})

accountsRouter.post('/createNewAccount', (req, res) => {
    let json = JSON.parse(req.headers['data'])
    createNewAccount(res, json)
})

accountsRouter.post('/updateAccount', (req, res) => {

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

function createNewAccount(res = null, accountData) {
    let numMissing = 0
    let errorMessage = "Error: Missing "
    if (accountData.username === undefined) {
        errorMessage += "Account Username, "
        numMissing++
    }
    if (accountData.password === undefined) {
        errorMessage += "Account Password, "
        numMissing++
    }
    if (accountData.accessLevel === undefined) {
        errorMessage += "Account Access Level, "
        numMissing++
    }
    if (accountData.dentistNumber === undefined) {
        errorMessage += "Dentist Number, "
        numMissing++
    }
    if (accountData.DOB === undefined) {
        errorMessage += "Date of Birth, "
        numMissing++
    }
    if (accountData.Email_Address === undefined) {
        errorMessage += "Email Address, "
        numMissing++
    }
    if (accountData.Contact_Number === undefined) {
        errorMessage += "Contact Phone Number, "
        numMissing++
    }

    if (numMissing > 0) {
        errorMessage = errorMessage.slice(0, -2) + "."
        res.send({result: 1, error: errorMessage})
        return
    }
    // No missing data, time to check if account already exists
    let sql = "SELECT * FROM accounts WHERE AccountName='" + accountData.username + "'"
    let accountExists = 0
    aClient.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            if (res) {
                res.send({result: 1, error: err})
                return
            } else {
                return {result: 1, error: err}
            }
        }
        accountExists = Object.keys(result).length

        if (accountExists > 0) {
            if (res) {
                res.send({result: 1, error: "Account with given username already exists!"})
                return
            } else {
                return {result: 1, error: "Account with given username already exists!"}
            }
        }
        let accountPasswordSalt = makeid(15);
        // Verified that account doesn't already exist, time to add them
        sql = "INSERT INTO accounts (AccountName, AccountPasswordHash, AccountPasswordSalt, AccountAccessLevel, DentistNumber, DOB, Email, PhoneNumber) " 
        + "VALUES ('" 
        + accountData.username + "', " 
        + "'" + sha256(accountData.password + accountPasswordSalt) + "', " 
        + "'" + accountPasswordSalt + "', " 
        + "'" + accountData.accessLevel + "', " 
        + "'" + accountData.dentistNumber + "', " 
        + "'" + accountData.DOB + "', "
        + "'" + accountData.Email_Address + "', " 
        + "'" + accountData.Contact_Number + "')"
    
        databaseQuery(res, sql)
    });
}

module.exports = {accountsRouter, setAClient};