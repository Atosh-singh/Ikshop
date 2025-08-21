// src/app.js
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Import central routes
const routes = require("./Routes/index");
app.use("/api", routes);

module.exports = app;
