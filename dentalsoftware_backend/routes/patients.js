const express = require('express');
const patientRouter = express.Router();
const { databaseQuery } = require('../helpers/db');

let pClient;

function setPClient(client) {
    pClient = client;
}

function getPaitientDataByID(id, res) {
    let patientID = id;

    let patientData;
    let patientToothData;
    let patientToothQuadrantData;

    let sql = "SELECT * FROM patient_data WHERE ID = '" + patientID + "';"
    pClient.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            if (res) {
                res.send({result: 1, error: err})
            } else {
                return {result: 1}
            }
        }

        patientData = result;

        sql = "SELECT * FROM patient_tooth_data WHERE Patient = '" + patientID + "';"
        pClient.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                if (res) {
                    res.send({result: 1, error: err})
                } else {
                    return {result: 1}
                }
            }
    
            patientToothData = result;
    
            sql = "SELECT * FROM patient_tooth_quadrant_data WHERE Patient = '" + patientID + "';"
            pClient.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                    if (res) {
                        res.send({result: 1, error: err})
                    } else {
                        return {result: 1}
                    }
                }
        
                patientToothQuadrantData = result;
                
                res.send({result: {
                    patient: patientData,
                    patientTeeth: patientToothData,
                    patientTeethQuadrant: patientToothQuadrantData
                    }
                })
        
            });
    
        });
    });
}

patientRouter.post('/getAllPatientData', (req, res) => {
    let searchItem = "*";
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM patient_data";
    databaseQuery(res, sql);
})

patientRouter.post('/getPaitientDataByID', async (req, res) => {
    let id = req.headers['id'];
    getPaitientDataByID(id, res)
})

patientRouter.post('/deletePatientData', (req, res) => {

    let NHINumber = req.headers['nhinumber'];
    let sql = "DELETE FROM patient_data WHERE NHI = '" + NHINumber + "';";
    databaseQuery(res, sql);

})

patientRouter.post('/updatePatientData', (req, res) => {

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

patientRouter.post('/createNewPatient', (req, res) => {
    let json = JSON.parse(req.headers['data'])
    createNewPatient(res, json)
})

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
    pClient.query(sql, function (err, result) {
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
        sql = "INSERT INTO patient_data (NHI, FirstName, " + (patientData.patient_Middle_Name != undefined ? "MiddleName, " : "") + "LastName, DOB, ContactNumber, Email" + (patientData.patient_Notes != undefined ? ", Notes" : " ") + (patientData.patient_Existing_Conditions != undefined ? ", ExistingConditions" : " ") + ") " 
        + "VALUES ('" 
        + patientData.patient_NHI + "', " 
        + "'" + patientData.patient_First_Name + "', " 
        + (patientData.patient_Middle_Name != undefined ? "'" + patientData.patient_Middle_Name +"', " : "") 
        + "'" + patientData.patient_Last_Name + "', " 
        + "'" + patientData.patient_DOB + "', "
        + "'" + patientData.patient_Contact_Number + "', " 
        + "'" + patientData.patient_Email_Address + "'"
        + (patientData.patient_Notes != undefined ? ", '" + patientData.patient_Notes + "'" : "")
        + (patientData.patient_Existing_Conditions != undefined ? ", '" + JSON.stringify(patientData.patient_Existing_Conditions) + "'" : "")
        + ")"
    
        result = databaseQuery(null, sql)

        sql = "SELECT * FROM patient_data WHERE NHI = '" + patientData.patient_NHI + "';";

        pClient.query(sql, function (err, result) {
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
                    res.send({result: 1, error: "Failed to add patient to Database!"})
                    return
                } else {
                    return {result: 1, error: "Failed to add patient to Database!"}
                }
            }

            let patientID = result[0]['ID'];

            for (let i = 0; i < 32; i++) {
                sql = "INSERT INTO patient_tooth_data (Patient, ToothID, Notes, leftLowerPocketGap, leftMiddlePocketGap, leftUpperPocketGap, rightLowerPocketGap, rightMiddlePocketGap, rightUpperPocketGap) " +
                "VALUES (" + patientID + ", " + (i + 1) + ", 'TOOTH_NOTES_HERE', 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);"
                pClient.query(sql, function (err) {
                    if (err) {
                        console.log(err)
                        res.send({result: 1, error: err})
                    }
                    sql = "INSERT INTO patient_tooth_quadrant_data (Patient, Tooth, Quadrant, Notes, AffectedArea) VALUES ";
                    for (let k = 0; k < 9; k++) {
                        sql += "(" + patientID + ", " + (i + 1) + ", " + (k + 1) + ", 'QUADRANT_NOTES_HERE', 0), "
                    }
                    sql = sql.slice(0, -2); 
                    sql += ";";
                    pClient.query(sql, function (err) {
                        if (err) {
                            console.log(err)
                            res.send({result: 1, error: err})
                        }
                    });
                });
            }

        });

        res.send({result: result})
    });
}

module.exports = {patientRouter, setPClient};