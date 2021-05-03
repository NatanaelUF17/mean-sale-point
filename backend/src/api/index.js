const express = require('express');
const router = express.Router();

const categories = require('./routes/categories');

// Entry point of the API
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to this API',
    });
});

// Routes of the api
router.use('/categories', categories);   

module.exports = router;