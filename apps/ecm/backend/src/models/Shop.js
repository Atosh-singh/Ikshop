const mongoose = require('mongoose');

// Define the Shop Schema for E-commerce
const shopSchema = new mongoose.Schema({
  // Flags for Shop Status
  removed: {
    type: Boolean,
    default: false, // Soft delete flag
  },
  enabled: {
    type: Boolean,
    default: true, // Flag to enable/disable the shop
  },

  // Shop Information
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,  // Ensure each shop has a unique name
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the shop owner
    required: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',  // Default empty description
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address', // Reference to the Address model
    required: true, // Make sure an address is always provided
  },
  phone: {
    type: String,
    trim: true,
    default: '', // Default empty phone number
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'inactive'], // Status of the shop
    default: 'active',
  },
  logo: {
    type: String,
    trim: true,
    default: "", // Default empty logo URL
  },
   slug: {
    type: String,
    unique: true,  // Ensure that the slug is unique
    trim: true,
  },
  shopType: {
    type: String,
    enum: ['physical', 'online', 'hybrid'], // Type of shop (physical, online, or hybrid)
    default: 'physical',
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

// Create the Shop model
const Shop = mongoose.model('Shop', shopSchema);

// Export the Shop model
module.exports = {Shop}
