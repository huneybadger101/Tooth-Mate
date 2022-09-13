const express = require('express');
const mysql = require('mysql'); 
const app = express();
const sjcl = require('sjcl');

let client;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function sha256(message) {
    let myBitArray = sjcl.hash.sha256.hash(message)
    return sjcl.codec.hex.fromBits(myBitArray)
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getPaitientDataByID(id, res) {
    let patientID = id;

    let patientData;
    let patientToothData;
    let patientToothQuadrantData;

    let sql = "SELECT * FROM patient_data WHERE ID = '" + patientID + "';"
    client.query(sql, function (err, result) {
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
        client.query(sql, function (err, result) {
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
            client.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                    if (res) {
                        res.send({result: 1, error: err})
                    } else {
                        return {result: 1}
                    }
                }
        
                patientToothQuadrantData = result;

                console.log(patientData)
                console.log(patientToothData)
                console.log(patientToothQuadrantData)
                
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

app.post('/getAllPatientData', (req, res) => {
    let searchItem = "*";
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM patient_data";
    databaseQuery(res, sql);
})

app.post('/getPaitientDataByID', async (req, res) => {
    let id = req.headers['id'];
    getPaitientDataByID(id, res)
})

app.post('/deletePatientData', (req, res) => {

    let NHINumber = req.headers['nhinumber'];
    let sql = "DELETE FROM patient_data WHERE NHI = '" + NHINumber + "';";
    databaseQuery(res, sql);

})

app.post('/updatePatientData', (req, res) => {

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

app.post('/getAllQuotes', (req, res) => {
    let searchItem = "*";
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM quotes";
    databaseQuery(res, sql);
})

app.post('/deleteQuote', (req, res) => {

    let quoteID = req.headers['quoteid'];
    let sql = "DELETE FROM quotes WHERE ID = '" + quoteID + "';";
    databaseQuery(res, sql);

})

app.post('/deleteAllQuotesForPatient', (req, res) => {

    let patientID = req.headers['patientid'];
    let sql = "DELETE FROM quotes WHERE PATIENT = '" + patientID + "';";
    databaseQuery(res, sql);

})

app.post('/createNewQuote', (req, res) => {
    let json = JSON.parse(req.headers['data'])
    createNewQuote(res, json)
})

app.post('/updateQuote', (req, res) => {

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


app.post('/getAllImagesForPatient', (req, res) => {
    let searchItem = "*";
    let patientID = req.headers['id']
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM patient_images WHERE ID = '" + patientID + "'";
    databaseQuery(res, sql);
})

app.post('/deleteImage', (req, res) => {

    let imageID = req.headers['imageid'];
    let sql = "DELETE FROM patient_images WHERE ID = '" + imageID + "';";
    databaseQuery(res, sql);

})

app.post('/createNewImage', (req, res) => {
    let json = JSON.parse(req.headers['data'])
    createNewImage(res, json)
})

app.post('/getAllBookings', (req, res) => {
    let searchItem = "*";
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM bookings";
    databaseQuery(res, sql);
})

app.post('/deleteBooking', (req, res) => {
    
    let bookingID = req.headers['bookingid'];
    let sql = "DELETE FROM bookings WHERE ID = '" + bookingID + "';";
    databaseQuery(res, sql);

})

app.post('/createNewBooking', (req, res) => {
    let json = JSON.parse(req.headers['data'])
    createNewBooking(res, json)
})


app.post('/updateBooking', (req, res) => {

    let bookingID = req.headers['bookingid'];
    let cols = JSON.parse(req.headers['cols']);
    let vals = JSON.parse(req.headers['vals']);

    let setString = "";

    for (let i = 0; i < cols.length; i++) {
        setString += cols[i] + " = '" + vals[i] + "', ";
    }

    setString = setString.slice(0,  -2)

    let sql = "UPDATE bookings SET " + setString + " WHERE ID = '" + bookingID + "';";
    databaseQuery(res, sql);

})

app.post('/getAllAccounts', (req, res) => {
    let searchItem = "*";
    if (req.headers['searchitem'] != undefined) {
        searchItem = req.headers['searchitem'];
    }
    let sql = "SELECT " + searchItem + " FROM accounts";
    databaseQuery(res, sql);
})

app.post('/deleteAccount', (req, res) => {

    let accountID = req.headers['accountid'];
    let sql = "DELETE FROM accounts WHERE ID = '" + accountID + "';";
    databaseQuery(res, sql);
    
})

app.post('/createNewAccount', (req, res) => {
    let json = JSON.parse(req.headers['data'])
    createNewAccount(res, json)
})

app.post('/updateAccount', (req, res) => {

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

app.post('/loginAccount', (req, res) => {

    let username = req.headers['username'];
    let password = req.headers['password'];

    let sql = "SELECT AccountPasswordSalt FROM accounts WHERE AccountName = '" + username + "';";

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

})

app.post('/createNewPatient', (req, res) => {
    let json = JSON.parse(req.headers['data'])
    createNewPatient(res, json)
})

function databaseConnect(host = "localhost", username = "root", password = null, database = "toothmate", port = 3306) {
    client = mysql.createConnection({
        host: host,
        user: username,
        port: port,
        password: password,
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
        sql = "INSERT INTO patient_data (NHI, FirstName, " + (patientData.patient_Middle_Name != undefined ? "MiddleName, " : "") + "LastName, DOB, ContactNumber, Email" + (patientData.patient_Notes != undefined ? ", Notes" : " ") + ") " 
        + "VALUES ('" 
        + patientData.patient_NHI + "', " 
        + "'" + patientData.patient_First_Name + "', " 
        + (patientData.patient_Middle_Name != undefined ? "'" + patientData.patient_Middle_Name +"', " : "") 
        + "'" + patientData.patient_Last_Name + "', " 
        + "'" + patientData.patient_DOB + "', "
        + "'" + patientData.patient_Contact_Number + "', " 
        + "'" + patientData.patient_Email_Address + "'"
        + (patientData.patient_Notes != undefined ? ", '" + patientData.patient_Notes + "'" : "") 
        + ")"
    
        result = databaseQuery(null, sql)

        sql = "SELECT * FROM patient_data WHERE NHI = '" + patientData.patient_NHI + "';";

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
                client.query(sql, function (err) {
                    if (err) {
                        console.log(err)
                        res.send({result: 1, error: err})
                    }
                    sql = "INSERT INTO patient_tooth_quadrant_data (Patient, Tooth, Quadrant, Notes) VALUES ";
                    for (let k = 0; k < 9; k++) {
                        sql += "(" + patientID + ", " + (i + 1) + ", " + (k + 1) + ", 'QUADRANT_NOTES_HERE'), "
                    }
                    sql = sql.slice(0, -2); 
                    sql += ";";
                    client.query(sql, function (err) {
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
    if (accountData.password === undefined) {
        errorMessage += "Account Access Level, "
        numMissing++
    }
    if (accountData.password === undefined) {
        errorMessage += "Dentist Number, "
        numMissing++
    }
    if (accountData.password === undefined) {
        errorMessage += "Date of Birth, "
        numMissing++
    }
    if (accountData.password === undefined) {
        errorMessage += "Email Address, "
        numMissing++
    }
    if (accountData.password === undefined) {
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


function createNewBooking(res = null, bookingData) {
    let numMissing = 0
    let errorMessage = "Error: Missing "
    if (bookingData.patientID === undefined) {
        errorMessage += "Patient ID, "
        numMissing++
    }
    if (bookingData.date === undefined) {
        errorMessage += "Date, "
        numMissing++
    }
    if (bookingData.time === undefined) {
        errorMessage += "Time, "
        numMissing++
    }
    if (bookingData.dentistID === undefined) {
        errorMessage += "Dentist ID, "
        numMissing++
    }
    if (bookingData.procedure === undefined) {
        errorMessage += "Procedure, "
        numMissing++
    }
    /*
    if (bookingData.affectedAreas === undefined) {
        errorMessage += "Affected Areas, "
        numMissing++
    }
    */
    let newDate = bookingData.date;

    let splitTime = bookingData.time.split(":");
    let newTime = splitTime[0] + ":" + splitTime[1].slice(0, -2) + ":00";
    let hour = splitTime[0];
    let minute = splitTime[1].slice(0, -2);

    if (numMissing > 0) {
        errorMessage = errorMessage.slice(0, -2) + "."
        res.send({result: 1, error: errorMessage})
        return
    }

    let sql = "SELECT * FROM bookings WHERE Date='" + newDate + "'"
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

        if (Object.keys(result).length > 0) {

            for (let i = 0; i < Object.keys(result).length; i++) {
                let tempHour = result[i]['Time'].split(":")[0]
                let tempMin = result[i]['Time'].split(":")[1]

                let tempTime = (tempHour * 60) + tempMin;
                let newTime = (hour * 60) + minute;

                let diff = Math.abs(tempTime - newTime);

                if (diff < 90) {
                    if (res) {
                        res.send({result: 1, error: "Booking already exists within 90 minutes of the given time/date!"})
                        return
                    } else {
                        return {result: 1, error: "Booking already exists within 90 minutes of the given time/date!"}
                    }
                }
            }
        }

        sql = "INSERT INTO `bookings` (`Date`, `Time`, `Patient`, `Dentist`, `FeeDollars`, `FeeCents`, `Location`, `Notes`, `ProcedureName`, `AffectedAreas`) "
        + "VALUES ('" + newDate + "', '" + newTime + "', '" + bookingData.patientID + "', '" + bookingData.dentistID + "', '100', '99', 'Default Location', '" + bookingData.notes + "', '" + bookingData.procedure + "', '" + bookingData.affectedAreas + "')"
        databaseQuery(res, sql)
    });
}

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

    if (quoteData.totalCostCents === undefined) {
        errorMessage += "Total Cost (Cents), "
        numMissing++
    }

    if (numMissing > 0) {
        errorMessage = errorMessage.slice(0, -2) + "."
        res.send({result: 1, error: errorMessage})
        return
    }

    let sql = "SELECT * FROM quotes WHERE Booking='" + quoteData.bookingID + "'"
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

        if (Object.keys(result).length > 0) {

            if (res) {
                res.send({result: 1, error: "A quote for the given Booking already exists!"})
                return
            } else {
                return {result: 1, error: "A quote for the given Booking already exists!"}
            }
        }

        sql = "INSERT INTO `quotes` (`Patient`, `Dentist`, `Booking`, `QuoteCreationDate`, `QuotePaymentStatus`, `QuotePaymentDeadline`, `QuoteTotalCostDollars`, `QuoteTotalCostCents`) "
        + "VALUES (" + quoteData.patientID + ", " + quoteData.dentistID + ", " + quoteData.bookingID + ", '" + new Date().toISOString().slice(0, 19).replace('T', ' ') + "', 'UNPAID', '" + addDays(new Date(), 30).toISOString().slice(0, 19).replace('T', ' ') + "', " + quoteData.totalCostDollars + ", " + quoteData.totalCostCents + ")"
    
        databaseQuery(res, sql)
    });
}

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

function databaseCreateTables(res = null) {
    let sql = "CREATE TABLE IF NOT EXISTS patient_data (ID INT AUTO_INCREMENT PRIMARY KEY, NHI VARCHAR(255) NOT NULL, FirstName VARCHAR(255) NOT NULL, LastName VARCHAR(255) NOT NULL, MiddleName VARCHAR(255), DOB DATE NOT NULL, ContactNumber VARCHAR(255) NOT NULL, Email VARCHAR(255) NOT NULL, Notes MEDIUMTEXT)";
    databaseQuery(res, sql)
    sql = "CREATE TABLE IF NOT EXISTS accounts (ID INT AUTO_INCREMENT PRIMARY KEY, AccountName VARCHAR(255) NOT NULL, AccountPasswordHash VARCHAR(255) NOT NULL, AccountPasswordSalt VARCHAR(255) NOT NULL, AccountAccessLevel INT, DentistNumber INT, DOB DATE NOT NULL, Email VARCHAR(255) NOT NULL, PhoneNumber VARCHAR(255) NOT NULL)";
    databaseQuery(null, sql) 
    sql = "CREATE TABLE IF NOT EXISTS bookings (ID INT AUTO_INCREMENT PRIMARY KEY, Date DATE NOT NULL, Time VARCHAR(255) NOT NULL, Patient INT NOT NULL, Dentist INT NOT NULL, Type VARCHAR(255), FeeDollars INT NOT NULL, FeeCents INT NOT NULL, Location VARCHAR(255), Notes VARCHAR(255), ProcedureName VARCHAR(255) NOT NULL, AffectedAreas VARCHAR(255), FOREIGN KEY (Patient) REFERENCES patient_data(ID), FOREIGN KEY (Dentist) REFERENCES accounts(ID))";
    databaseQuery(res, sql)
    sql = "CREATE TABLE IF NOT EXISTS quotes (ID INT AUTO_INCREMENT PRIMARY KEY, Patient INT NOT NULL, Dentist INT NOT NULL, Booking INT NOT NULL, QuoteCreationDate DATE NOT NULL, QuotePaymentStatus VARCHAR(255) NOT NULL, QuotePaymentDeadline DATE NOT NULL, QuoteTotalCostDollars INT NOT NULL, QuoteTotalCostCents INT NOT NULL, FOREIGN KEY (Patient) REFERENCES patient_data(ID), FOREIGN KEY (Dentist) REFERENCES accounts(ID), FOREIGN KEY (Booking) REFERENCES bookings(ID))";
    databaseQuery(res, sql)
    sql = "CREATE TABLE IF NOT EXISTS patient_images (ID INT AUTO_INCREMENT PRIMARY KEY, Patient INT NOT NULL, ImagePath VARCHAR(255) NOT NULL, FOREIGN KEY (Patient) REFERENCES patient_data(ID))";
    databaseQuery(res, sql)
    sql = "CREATE TABLE IF NOT EXISTS patient_tooth_data (ID INT AUTO_INCREMENT PRIMARY KEY, Patient INT NOT NULL, ToothID INT, Notes MEDIUMTEXT, leftLowerPocketGap DECIMAL(6,4) NOT NULL, leftMiddlePocketGap DECIMAL(6,4) NOT NULL, leftUpperPocketGap DECIMAL(6,4) NOT NULL, rightLowerPocketGap DECIMAL(6,4) NOT NULL, rightMiddlePocketGap DECIMAL(6,4) NOT NULL, rightUpperPocketGap DECIMAL(6,4) NOT NULL, FOREIGN KEY (Patient) REFERENCES patient_data(ID))";
    databaseQuery(res, sql)
    sql = "CREATE TABLE IF NOT EXISTS patient_tooth_quadrant_data (ID INT AUTO_INCREMENT PRIMARY KEY, Patient INT NOT NULL, Tooth INT NOT NULL, Quadrant INT, Notes MEDIUMTEXT, FOREIGN KEY (Tooth) REFERENCES patient_tooth_data(ID), FOREIGN KEY (Patient) REFERENCES patient_data(ID))";
    databaseQuery(res, sql)
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

databaseConnect("103.204.131.211", "toothmate", "SuperSecurePassword!?123", "toothmate", 33306)
// Tables are only created if they currently do not exist, will not be created on every launch
databaseCreateTables()

module.exports = app;
