const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const api = require('./api/index');

app.use(express.json());
app.use(cors());

// Entry point of the backend server 
app.get('/', (req, res, next) => {
    res.json({ 
        message: 'Welcome to the entry point of this API' 
    });
});

// Route for the api
app.use('/api/v1', api);

module.exports = app;