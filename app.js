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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    db.connect();
});
