// src/app.js
const express = require("express");
const cors = require("cors");
const path = require("path");



const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Serve static files (optional)
app.use("/images", express.static(path.join(__dirname, "../public/images"))); 

// ===== EJS setup =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // <-- folder where mail-verification.ejs & 404.ejs are


// Routes
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Import central routes
const routes = require("./Routes/index");
app.use("/api", routes);

// 404 fallback (optional)
app.use((req, res) => {
  res.status(404).render("404", { title: "404 Not Found" });
});

module.exports = app;
