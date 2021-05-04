const express = require('express');
const router = express.Router();

const Category = require('../../models/categories');
const categoriesService = require('../../services/categories.services');

// Get all
router.get('/', (req, res, next) => {
    categoriesService.getAllCategories((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories",
            });
        } else {
            res.send(data);
        }
    });
});

// Get one 
router.get('/:id', async (req, res, next) => {

    let id = req.params.id;
    
    categoriesService.getOneCategory(id, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: err.message || `Not found category with id: ${id}`,
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving category with id: ${id}`,
                });
            }
        } else {
            res.send(data);
        }
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
    categoriesService.createCategory(category, (err, data) => {
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

    if(!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }

    let id = req.params.id;
    
    const category = new Category({
        ...req.body
    });

    categoriesService.updateCategory(id, category, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found category with id ${id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating category with id ${id}`
                });
            }
        } else {
            res.send(data);
        }
    });
});

// Delete 
router.delete('/:id', (req, res, next) => {
    
    let id = req.params.id;

    categoriesService.deleteCategory(id, (err, data) => {
        if(err) {
            res.status(402).send({
                message: err.message
            });
        } else {
            res.send(data);
        }
    });
});

module.exports = router;