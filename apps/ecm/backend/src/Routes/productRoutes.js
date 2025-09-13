// Routes/roleRoutes

const express= require("express");

const router = express.Router();

// Controllers
const { addProduct } = require("../controllers/ProductController");

// create Role
router.post("/product-add", addProduct);



module.exports = router;