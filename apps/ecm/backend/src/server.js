// src/server.js
require("dotenv").config();
require("module-alias/register");
const express = require("express");
const { connectDB } = require("./config/db");
const app = require("./app");

// MongoDB connect
connectDB(process.env.MONGODB_URI);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
