const Category = require('../models/categories');
const categoriesService = require('../services/categories.services');

exports.getAllCategories = (req, res, next) => {
    try {
        categoriesService.getAll((err, data) => {
            if(err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving categories",
                });
            } else {
                res.send(data);
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.getCategoryById = (req, res, next) => {
    try {
        let id = req.params.id;
    
        categoriesService.getOneById(id, (err, data) => {
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
    } catch (error) {
        next(error);
    }
}

exports.createCategory = (req, res, next) => {
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
    try {
        categoriesService.create(category, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error ocurred while creating the Category"
                });
            } else {
                res.send(data);
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.updateCategoryById = (req, res, next) => {
    // Validate the body object data
    if(!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }

    // Grab the id from params
    let id = req.params.id;
    
    // Creating a new category instance with the incoming data
    const category = new Category({
        ...req.body
    });

    // Using a category service to update a category based on the id
    try {
        categoriesService.updateById(id, category, (err, data) => {
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
    } catch (error) {
        next(error);
    }
}

exports.deleteCategoryById = (req, res, next) => {
    try {
        let id = req.params.id;

        categoriesService.deleteById(id, (err, data) => {
            if(err) {
                res.status(402).send({
                    message: err.message
                });
            } else {
                res.send(data);
            }
        });
    } catch (error) {
        next(error);
    }
}