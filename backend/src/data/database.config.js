const mysql = require('mysql2');

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DATABASE,
});

connection.connect(error => {
    if (error) {
        throw error
    }
    console.log("Successfully connected to the database");
});

module.exports = connection;