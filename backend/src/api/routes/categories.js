const express = require('express');
const router = express.Router();

const Category = require('../../models/categories');
const categoriesService = require('../../services/categories');

// Get all
router.get('/', (req, res, next) => {
    res.json({
        message: 'Categories get all route',
    });
});

// Get one 
router.get('/:id', (req, res, next) => {
    res.json({
        message: 'Categories get one route',
    });
});

// Create 
router.post('/', (req, res, next) => {
    // Validate the body object data
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }

    // Creating a new category instance
    const category = new Category({
        id: 0,
        name: req.body.name,
    });

    // Using a category service to create a new category
    categoriesService.create(category, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error ocurred while creating the Category"
            });
        } else {
            res.send(data);
        }
    });
});

// Update 
router.put('/:id', (req, res, next) => {
    res.json({
        message: 'Categories put route',
    });
});

// Delete 
router.delete('/:id', (req, res, next) => {
    res.json({
        message: 'Categories delete route',
    });
});

module.exports = router;