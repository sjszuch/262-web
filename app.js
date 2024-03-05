const express = require('express');
const app = express();
const pg = require('pg');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

var array = [];

const db = new pg.Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'Mod7'
});

app.get('/', (req, res) => {
    const query = "SELECT * FROM contact_info";

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result.rows);
        }

        
    });
});

app.post('/add', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phone_number = req.body.phone_number;

    const query = `INSERT INTO contact_info (name, email, phone_number) VALUES ($1, $2, $3)`;

    db.query(query, [name, email, phone_number], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Contact added");
        }
    });
});

app.post('/edit' , (req, res) => {
    
    var name = req.body.name;
    var email = req.body.email;
    var phone_number = req.body.phone_number;

    const query = `UPDATE contact_info SET email = $1, phone_number = $2 WHERE name = $3`;

    db.query(query, [email, phone_number, name], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Contact updated");
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    db.connect();
});
