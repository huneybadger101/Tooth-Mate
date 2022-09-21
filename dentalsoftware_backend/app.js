const express = require('express');
const mysql = require('mysql'); 
const app = express();

let { databaseCreateTables, setDBClient } = require('./helpers/db');
let { patientRouter, setPClient } = require('./routes/patients');
let { accountsRouter, setAClient } = require('./routes/accounts');
let { bookingsRouter, setBClient } = require('./routes/bookings');
let { quotesRouter, setQClient } = require('./routes/quotes');
let { ticketsRouter, setTClient } = require('./routes/tickets');
let { loginRouter, setLClient } = require('./routes/login');
let { imagesRouter, setIClient } = require('./routes/images');

let client;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/patients', patientRouter);
app.use('/accounts', accountsRouter);
app.use('/bookings', bookingsRouter);
app.use('/quotes', quotesRouter);
app.use('/tickets', ticketsRouter);
app.use('/login', loginRouter);
app.use('/images', imagesRouter);

function databaseConnect(host = "localhost", username = "root", password = null, database = "toothmate", port = 3306) {

    client = mysql.createConnection({
        host: host,
        user: username,
        port: port,
        password: password,
        database: database
    });

    setDBClient(client);
    setPClient(client);
    setAClient(client);
    setBClient(client);
    setQClient(client);
    setTClient(client);
    setLClient(client);
    setIClient(client);
}

databaseConnect("103.204.131.211", "toothmate", "SuperSecurePassword!?123", "toothmate", 33306)
// Tables are only created if they currently do not exist, will not be created on every launch
databaseCreateTables()

module.exports = app;
