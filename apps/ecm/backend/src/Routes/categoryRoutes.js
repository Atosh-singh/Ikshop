// routes/categoryRoutes.js
const express = require('express');
const { 
  addCategory, 
  getCategory, 
  updateCategory, 
  deleteCategory, 
  getCategoryByName 
} = require('../controllers/CategoryController');
const router = express.Router();

// Route to add category
router.post("/add-category", addCategory);

// Route to get category by ID or slug (or fetch all categories)
router.get("/get-category", getCategory);  // Fetch all categories
router.get("/get-category/:identifier", getCategory);  // Fetch category by ID or slug

// Route to search category by name and get all child categories inside it
router.get("/get-category-by-name/:name", getCategoryByName);  // Fetch category by name and its children

// Route to update category by ID or slug
router.put("/update-category/:identifier", updateCategory);

// Route to delete category by ID or slug
router.delete("/delete-category/:identifier", deleteCategory);

module.exports = router;
