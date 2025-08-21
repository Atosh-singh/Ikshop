
// Routes/index.js
const express = require("express");

const router = express.Router();

//  Import route files

const userRoutes= require("./userRoutes");
const roleRoutes = require("./roleRoutes");

// Mount Routes

router.use("/users", userRoutes);
router.use("/roles", roleRoutes);


module.exports = router;