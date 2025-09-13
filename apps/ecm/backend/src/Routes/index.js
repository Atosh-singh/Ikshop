
// Routes/index.js
const express = require("express");

const router = express.Router();

//  Import route files

const userRoutes= require("./userRoutes");
const roleRoutes = require("./roleRoutes");
const categoryRoutes = require("./categoryRoutes");
const staffRoutes = require("./staffRoutes");
   const productRoutes = require('./productRoutes')



// Mount Routes

router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/categories", categoryRoutes); 
router.use("/staffs", staffRoutes);
router.use("/product", productRoutes);

module.exports = router;