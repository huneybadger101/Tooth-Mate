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

app.post('/addRecord', (req, res) => {
  const { nhi, treatmentSummary, notes, date } = req.body;

  const query = 'INSERT INTO medical_records (nhi, treatment_summary, notes, date) VALUES (?, ?, ?, CURDATE())';
  const values = [nhi, JSON.stringify(treatmentSummary), notes];

  connection.query(query, values, (error, results) => {
    if (error) return res.status(500).send(error);
    res.status(200).json({ message: 'Record added successfully!', recordId: results.insertId });
  });
});


app.put('/updateRecord', (req, res) => {
    const { recordId, treatmentSummary, notes } = req.body;

    if (!recordId) {
        return res.status(400).send('Bad Request: Missing required fields');
    }

    const query = 'UPDATE medical_records SET treatment_summary = ?, notes = ? WHERE id = ?';
    const values = [JSON.stringify(treatmentSummary), notes, recordId];
    console.log(recordId)
    connection.query(query, values, (error, results) => {
        if (error) return res.status(500).send(error);
        if (results.affectedRows === 0) return res.status(404).send('Record not found');
        res.status(200).send('Record updated successfully!');
    });
});

app.post('/updateInfo', (req, res) => {
    const { firstName, lastName, phone, street, city, country, nhi } = req.body;

    const updateQuery = `
      UPDATE contacts
      JOIN contacts_cstm ON contacts_cstm.id_c = contacts.id
      SET contacts.first_name = ?, 
          contacts.last_name = ?, 
          contacts.phone_mobile = ?, 
          contacts.primary_address_street = ?, 
          contacts.primary_address_city = ?, 
          contacts.primary_address_country = ?
      WHERE contacts_cstm.nhi_c = ?`;

    connection.query(updateQuery, [firstName, lastName, phone, street, city, country, nhi], (error, results) => {
        if (error) throw error;

        if (results.affectedRows > 0) {
            res.json({status: "Success", data: results});
	    console.log(results)
        } else {
            res.json({status: "Fail", info: "No patient found"});
	    console.log("No found");
        }
    });
});

app.get('/search/:nhi', (req, res) => {
    const searchTerm = req.params.nhi;
    console.log(req.params.nhi);
    connection.query(`
      SELECT contacts_cstm.*, contacts.*
      FROM contacts_cstm
      JOIN contacts ON contacts_cstm.id_c = contacts.id
      WHERE contacts_cstm.nhi_c LIKE ? 
        OR contacts.first_name LIKE ? 
        OR contacts.last_name LIKE ? 
        OR contacts.phone_mobile LIKE ?`,
      [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`],
      (error, results, fields) => {
          if (error) throw error;

          if (results.length > 0) {
              res.json({status: "Success", data: results});
          } else {
              res.json({status: "Fail", info: "No patient found"});
          }
      }
    );
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
                connection.query("SELECT * FROM medical_records WHERE nhi = ? ORDER BY date ASC", [req.params.nhi], (error, thirdResults, fields) => {
                    if (error) throw error;
                    console.log(thirdResults);
                    res.json({status:"Success", info: secondResults, otherInfo: firstResults, history: thirdResults})
                });
            });
        }
        else{
            res.json({status:"Fail", info: "No patient found"})
        }
    });

})


app.listen(2000,function (){
  console.log(`CORS-enabled web server listening on port 1000`);
});
