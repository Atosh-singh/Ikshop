const mongoose = require('mongoose');

// Define Category Schema
const categorySchema = new mongoose.Schema({
  // Flags to mark category status
  removed: {
    type: Boolean,
    default: false, // Soft delete flag
  },
  enabled: {
    type: Boolean,
    default: true, // Flag to enable/disable category
  },

  // Category basic information
  name: {
    type: String,
    required: true,
    unique: true,  // Ensure the category name is unique
    trim: true,
  },
  description: {
    type: String,
    trim: true, // Optional description for the category
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  // Reference to another category (for subcategories)
    default: null,    // Default to null if not a subcategory
  },
  slug: {
    type: String,
    unique: true,     // SEO-friendly unique URL for each category
    trim: true,
  },
  image: {
    type: String,     // Category image (URL or file path)
    trim: true,
  },
  
  // SEO-friendly fields
  metaTitle: {
    type: String,
    trim: true,       // SEO title for category page
  },
  metaDescription: {
    type: String,
    trim: true,       // SEO description for category page
  },

  // Additional fields
  isActive: {
    type: Boolean,
    default: true,    // Flag to indicate if the category is active
  },
  productsCount: {
    type: Number,
    default: 0,       // Number of products in this category (for optimization)
  },

}, { timestamps: true });  // Automatically tracks createdAt and updatedAt timestamps

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

// Export the model
module.exports = { Category };
