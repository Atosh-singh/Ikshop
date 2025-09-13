
// Routes/index.js
const express = require("express");

const router = express.Router();

//  Import route files

const userRoutes= require("./userRoutes");
const roleRoutes = require("./roleRoutes");
const categoryRoutes = require("./categoryRoutes");
const staffRoutes = require("./staffRoutes");
   const productRoutes = require('./productRoutes')

   // RBAC Routes testing 
   const RBACRoutes= require('./RBACRoutes')
   const adminRoutes = require('./adminRoutes')



// Mount Routes

router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/categories", categoryRoutes); 
router.use("/staffs", staffRoutes);
router.use("/product", productRoutes);


// RBAC Routes
router.use("/rbac", RBACRoutes)
router.use("/admin", adminRoutes);

module.exports = router;