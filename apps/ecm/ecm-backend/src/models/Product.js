const mongoose = require("mongoose");


// Define the Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // You can add more fields as needed, such as description, category, etc.
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
