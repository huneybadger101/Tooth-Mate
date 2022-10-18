const express = require('express');
const ticketsRouter = express.Router();
const { databaseQuery } = require('../helpers/db');

let tClient;

function setTClient(client) {
    tClient = client;
}

function getTicketDataByID(id, res) {
    let ticketID = id;

    let ticketData;
    let ticketVisitData;

    let sql = "SELECT * FROM tickets WHERE ID = '" + ticketID + "';"
    try {
        tClient.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                if (res) {
                    res.send({result: 1, error: err})
                } else {
                    return {result: 1}
                }
            }

            ticketData = result;

            sql = "SELECT * FROM ticket_visit WHERE Ticket = '" + ticketID + "';"
            tClient.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                    if (res) {
                        res.send({result: 1, error: err})
                    } else {
                        return {result: 1}
                    }
                }
        
                ticketVisitData = result;

                res.send({result: {
                    ticket: ticketData,
                    ticketVisit: ticketVisitData
                    }
                })

            });
        });
    } catch (error) {
        console.log(error)
        res.send(error)
    }   
}

ticketsRouter.post('/getAllTickets', (req, res) => {
    let searchItem = "*";
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM tickets";
    databaseQuery(res, sql);
})

ticketsRouter.post('/getTicketDataByID', async (req, res) => {
    let id = req.headers['id'];
    getTicketDataByID(id, res)
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

    if (numMissing > 0) {
        errorMessage = errorMessage.slice(0, -2) + "."
        res.send({result: 1, error: errorMessage})
        return
    }

    let sql = "INSERT INTO `tickets` (`Patient`, `NumberOfVisits`) VALUES (" + ticketData.ticket.PatientID + ", " + ticketData.ticket.NumberOfVisits + ")"
    try {
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
                sql = "INSERT INTO `ticket_visit` (`VisitNumber`, `Ticket`, `Notes`, `Tooth`, `ProcedureName`) VALUES ";
                for (let i = 0; i < ticketData.ticketVisit.length; i++) {
                    sql += "(" + ticketData.ticketVisit[i]['VisitNumber'] + ", " + ticketID + ", '" + ticketData.ticketVisit[i]['Notes'] + "', '" + ticketData.ticketVisit[i]['Tooth'] + "', '" + ticketData.ticketVisit[i]['Procedure'] + "'), "
                }
                sql = sql.slice(0, -2); 
                sql += ";";
                databaseQuery(res, sql);
            });
        });
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    
}

module.exports = {ticketsRouter, setTClient};