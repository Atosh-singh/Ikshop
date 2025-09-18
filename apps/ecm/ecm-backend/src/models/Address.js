const mongoose = require('mongoose');

// Address Schema for E-commerce
const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true, // Make sure street is always provided
    trim: true,     // Remove extra spaces from the input
  },
  city: {
    type: String,
    required: true, // City should always be provided
    trim: true,
  },
  state: {
    type: String,
    required: true, // State should always be provided
    trim: true,
  },
  zipcode: {
    type: String,
    required: true, // Zipcode is required for address identification
    trim: true,
  },
  country: {
    type: String,
    required: true, // Country is required for complete address
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Each address should be linked to a user
  },
  enabled: {
    type: Boolean,
    default: true,  // Flag to enable/disable address
  },
  removed: {
    type: Boolean,
    default: false,  // Flag to mark an address as removed (soft delete)
  },
}, { timestamps: true });  // Automatically add createdAt and updatedAt

// Create and export the Address model
const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
