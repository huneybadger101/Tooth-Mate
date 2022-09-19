const express = require('express');
const imagesRouter = express.Router();
const { databaseQuery } = require('../helpers/db');

let iClient;

function setIClient(client) {
    iClient = client;
}


imagesRouter.post('/getAllImagesForPatient', (req, res) => {
    let searchItem = "*";
    let patientID = req.headers['id']
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM patient_images WHERE ID = '" + patientID + "'";
    databaseQuery(res, sql);
})

imagesRouter.post('/deleteImage', (req, res) => {

    let imageID = req.headers['imageid'];
    let sql = "DELETE FROM patient_images WHERE ID = '" + imageID + "';";
    databaseQuery(res, sql);

})

imagesRouter.post('/createNewImage', (req, res) => {
    let json = JSON.parse(req.headers['data'])
    createNewImage(res, json)
})

function createNewImage(res = null, imageData) {

    let numMissing = 0
    let errorMessage = "Error: Missing "
    if (imageData.patientID === undefined) {
        errorMessage += "Patient ID, "
        numMissing++
    }
    if (imageData.imagePath === undefined) {
        errorMessage += "Image Path, "
        numMissing++
    }
    if (numMissing > 0) {
        errorMessage = errorMessage.slice(0, -2) + "."
        res.send({result: 1, error: errorMessage})
        return
    }

    let sql = "INSERT INTO `patient_images` (`Patient`, `ImagePath`) " 
    + "VALUES (" + imageData.patientID + ", '" + imageData.imagePath + "')"
    
    databaseQuery(res, sql)
}

module.exports = {imagesRouter, setIClient};