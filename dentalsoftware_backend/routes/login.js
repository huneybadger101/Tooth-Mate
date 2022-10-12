const express = require('express');
const loginRouter = express.Router();
const { databaseQuery } = require('../helpers/db');
const { sha256 } = require('../helpers/accountsHelper');

let lClient;

function setLClient(client) {
    lClient = client;
}

loginRouter.post('/loginAccount', (req, res) => {

    let username = req.headers['username'];
    let password = req.headers['password'];

    let sql = "SELECT AccountPasswordSalt FROM accounts WHERE AccountName = '" + username + "';";
    try {
        lClient.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                if (res) {
                    res.send({result: 1, error: err})
                    return
                } else {
                    return {result: 1, error: err}
                }
            }

            if (Object.keys(result).length == 0) {
                if (res) {
                    res.send({result: 1, error: "Username or password was incorrect, please try again!"})
                    return
                } else {
                    return {result: 1, error: "Username or password was incorrect, please try again!"}
                }
            }

            let passwordSalt = result[0]['AccountPasswordSalt'];
            let hashedPassword = sha256(password + passwordSalt);

            sql = "SELECT * FROM accounts WHERE AccountName = '" + username + "' AND AccountPasswordHash = '" + hashedPassword + "';";

            lClient.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                    if (res) {
                        res.send({result: 1, error: err})
                        return
                    } else {
                        return {result: 1, error: err}
                    }
                }
                userPasswordMatches = Object.keys(result).length
        
                if (userPasswordMatches == 0) {
                    if (res) {
                        res.send({result: 1, error: "Username or password was incorrect, please try again!"})
                        return
                    } else {
                        return {result: 1, error: "Username or password was incorrect, please try again!"}
                    }
                }
                res.send({result: result[0], success: 1})
            });        

        });
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

module.exports = {loginRouter, setLClient};