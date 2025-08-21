const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true, // Flag for whether the product is active or disabled
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sku: {
    type: String,
    trim: true,
    unique: true, // SKU should be unique for each product
  },
  description: {
    type: String,
    trim: true, // Optional field with description
    default: '',  // Default empty string if not provided
  },
  price: {
    type: Number,
    required: true, // Price must be provided for every product
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Reference to the Category model
    required: true, // Product must belong to a category
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop", // Reference to the Shop model
    required: true, // Product must belong to a shop
  },
}, { timestamps: true }); // Automatic timestamps (createdAt, updatedAt)

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
