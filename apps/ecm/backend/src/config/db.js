// src/config/db.js
const mongoose = require('mongoose');

async function connectDB(uri) {
  if (!uri) {
    throw new Error('MONGO_ECOMMERCE_URI is missing');
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 15000,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // app crash with proper exit
  }
}

module.exports = { connectDB };
