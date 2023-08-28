const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const mysql = require('mysql2');

app.use(cors({credentials: true, origin: true,}));



app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '192.168.11.160',
    user: 'root',
    password: '1234',
    database: 'suitecrm'
});

app.get('/:nhi', (req,res) =>{
    connection.connect(err => {
        if (err) {
          console.error('Error connecting to the database:', err.stack);
          return;
        }
        console.log('Connected to the database with ID', connection.threadId);
    });
    
    connection.query("SELECT * FROM contacts_cstm WHERE nhi_c = ?",[req.params.nhi], (error, firstResults, fields) => {
        if (error) throw error;
    
        if (firstResults.length > 0) {
            const contactId = firstResults[0].id_c;
    
            connection.query("SELECT * FROM contacts WHERE id = ?", [contactId], (error, secondResults, fields) => {
                if (error) throw error;
                console.log(secondResults);
                connection.query("SELECT * FROM appointments WHERE NHI = ? ORDER BY DateOfAppointment ASC", [req.params.nhi], (error, thirdResults, fields) => {
                    if (error) throw error;
                    console.log(secondResults);
                    res.json({status:"Success", info: secondResults, otherInfo: firstResults, history: thirdResults})
                });                
                res.json({status:"Success", info: secondResults, otherInfo: firstResults})
            });
        }
        else{
            res.json({status:"Fail", info: "No patient found"})
        }
    });

})

  

app.listen(2000,function (){
  console.log(`CORS-enabled web server listening on port 2000`);
});