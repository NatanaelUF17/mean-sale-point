const express = require('express');
const router = express.Router();

const categoriesController = require('../../controllers/categories.controller');

// Get all
router.get('/', categoriesController.getAllCategories);
// Get one 
router.get('/:id', categoriesController.getCategoryById);
// Create one
router.post('/', categoriesController.createCategory);
// Update one
router.put('/:id', categoriesController.updateCategoryById);
// Delete one
router.delete('/:id', categoriesController.deleteCategoryById);

module.exports = router;