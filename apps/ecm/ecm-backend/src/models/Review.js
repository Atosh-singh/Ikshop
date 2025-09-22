const mongoose = require('mongoose');

// Define the Review Schema
const reviewSchema = new mongoose.Schema({
  // Reference to the Product being reviewed
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },

  // Reference to the User who wrote the review
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  // Rating given by the user (1 to 5)
  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  },

  // Optional review text to describe the review
  reviewText: { 
    type: String, 
    trim: true 
  },

  // Timestamp to store when the review was created
  createdAt: { 
    type: Date, 
    default: Date.now 
  },

  // Flags for managing soft delete functionality
  removed: {
    type: Boolean,
    default: false, // Marks the review as removed but not deleted
  },

  enabled: {
    type: Boolean,
    default: true, // Indicates whether the review is enabled or not
  }

}, { timestamps: true });  // Automatically adds `createdAt` and `updatedAt` timestamps

// Create and export the Review model
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
