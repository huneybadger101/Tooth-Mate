const express = require('express');
const ticketsRouter = express.Router();
const { databaseQuery } = require('../helpers/db');

let tClient;

function setTClient(client) {
    tClient = client;
}

ticketsRouter.post('/getAllTickets', (req, res) => {
    let searchItem = "*";
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM tickets";
    databaseQuery(res, sql);
})

ticketsRouter.post('/deleteTicket', (req, res) => {
    
    let ticketID = req.headers['ticketid'];
    let sql = "DELETE FROM tickets WHERE ID = '" + ticketID + "';";
    databaseQuery(res, sql);

})

ticketsRouter.post('/createNewTicket', (req, res) => {
    let json = JSON.parse(req.headers['data'])
    createNewTicket(res, json)
})


ticketsRouter.post('/updateTicket', (req, res) => {

    let ticketID = req.headers['ticketid'];
    let cols = JSON.parse(req.headers['cols']);
    let vals = JSON.parse(req.headers['vals']);

    let setString = "";

    for (let i = 0; i < cols.length; i++) {
        setString += cols[i] + " = '" + vals[i] + "', ";
    }

    setString = setString.slice(0,  -2)

    let sql = "UPDATE tickets SET " + setString + " WHERE ID = '" + ticketID + "';";
    databaseQuery(res, sql);

})

/* 

JSON Layout for incoming ticket creation:

{
    "ticket": {
        "PatientID": Number,
        "NumberOfVisits": Number
    },
    "ticketVisit": [
        {
            "VisitNumber": Number,
            "Date": Date String,
            "Time": String,
            "VisitTimeLength": Number (Minutes)
        }
    ],
    "ticketVisitTeeth": [
        {
            "VisitNumber": Number,
            "Tooth": Number,
            "ProcedureName": String,
            "ProcedureCostDollars": Number,
            "ProcedureCostCents": Number
        }
    ]
}

*/

function createNewTicket(res = null, ticketData) {

    let numMissing = 0
    let errorMessage = "Error: Missing "
    if (ticketData.ticket === undefined) {
        errorMessage += "Ticket Data, "
        numMissing++
    }
    if (ticketData.ticketVisit === undefined) {
        errorMessage += "Ticket Visit Data, "
        numMissing++
    }
    if (ticketData.ticketVisitTeeth === undefined) {
        errorMessage += "Ticket Visit Teeth Data, "
        numMissing++
    }

    if (numMissing > 0) {
        errorMessage = errorMessage.slice(0, -2) + "."
        res.send({result: 1, error: errorMessage})
        return
    }

    let sql = "INSERT INTO `tickets` (`Patient`, `NumberOfVisits`) VALUES (" + ticketData.ticket.PatientID + ", " + ticketData.ticket.NumberOfVisits + ")"
    tClient.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            if (res) {
                res.send({result: 1, error: err})
                return
            } else {
                return {result: 1, error: err}
            }
        }

        sql = "SELECT * FROM tickets ORDER BY id DESC LIMIT 1";
        tClient.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                if (res) {
                    res.send({result: 1, error: err})
                    return
                } else {
                    return {result: 1, error: err}
                }
            }
            ticketID = result[0]['ID'];
            sql = "INSERT INTO `ticket_visit` (`VisitNumber`, `Ticket`, `Date`, `Time`, `VisitTimeLength`) VALUES ";
            for (let i = 0; i < ticketData.ticketVisit.length; i++) {
                sql += "(" + ticketData.ticketVisit[i]['VisitNumber'] + ", " + ticketID + ", '" + ticketData.ticketVisit[i]['Date'] + "', '" + ticketData.ticketVisit[i]['Time'] + "', '" + ticketData.ticketVisit[i]['VisitTimeLength'] + "'), "
            }
            sql = sql.slice(0, -2); 
            sql += ";";
            tClient.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                    if (res) {
                        res.send({result: 1, error: err})
                        return
                    } else {
                        return {result: 1, error: err}
                    }
                }
                sql = "SELECT * FROM ticket_visit WHERE Ticket = '" + ticketID + "'";
                tClient.query(sql, function (err, result) {
                    if (err) {
                        console.log(err)
                        if (res) {
                            res.send({result: 1, error: err})
                            return
                        } else {
                            return {result: 1, error: err}
                        }
                    }
                    sql = "INSERT INTO `ticket_visit_tooth` (`TicketVisit`, `Tooth`, `ProcedureName`, `ProcedureCostDollars`, `ProcedureCostCents`, `Notes`, `ToothData1`, `ToothData2`, `ToothData3`, `ToothData4`, `ToothData5`, `ToothData6`, `ToothData7`, `ToothData8`, `ToothData9`) VALUES "
                    for (let i = 0; i < ticketData.ticketVisitTeeth.length; i++) {
                        for (let k = 0; k < result.length; k++) {
                            if (ticketData.ticketVisitTeeth[i]['VisitNumber'] == result[k]['VisitNumber']) {
                                sql += "(" + result[k]['ID'] + ", " + ticketData.ticketVisitTeeth[i]['Tooth'] + ", '" + ticketData.ticketVisitTeeth[i]['ProcedureName'] + "', " + ticketData.ticketVisitTeeth[i]['ProcedureCostDollars'] + ", " + ticketData.ticketVisitTeeth[i]['ProcedureCostCents'] + ", '" + ticketData.ticketVisitTeeth[i]['Notes'] + "', " + ticketData.ticketVisitTeeth[i]['ToothData'][0] + ", " + ticketData.ticketVisitTeeth[i]['ToothData'][1] + ", " + ticketData.ticketVisitTeeth[i]['ToothData'][2] + ", " + ticketData.ticketVisitTeeth[i]['ToothData'][3] + ", " + ticketData.ticketVisitTeeth[i]['ToothData'][4] + ", " + ticketData.ticketVisitTeeth[i]['ToothData'][5] + ", " + ticketData.ticketVisitTeeth[i]['ToothData'][6] + ", " + ticketData.ticketVisitTeeth[i]['ToothData'][7] + ", " + ticketData.ticketVisitTeeth[i]['ToothData'][8] + "), "
                            }
                        }
                    }
                    sql = sql.slice(0, -2); 
                    sql += ";";
                    databaseQuery(res, sql);
                });
            });
        });
    });
}

module.exports = {ticketsRouter, setTClient};