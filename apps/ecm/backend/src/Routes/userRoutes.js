

// Routes/userRoutes.js
const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require("path");

const multer = require("multer");

   const  uploadFile = require("../utils/uploadFile")




// Validators
const { createUserValidator } = require("../middlewares/validators/AuthValidator");

const {registerValidator} = require('../helpers/validation')

// Controllers
const { createUser, paginateUsers, readUser, updateUser, removeUser, userRegister } = require("../controllers/AuthController/AuthCrud");

// Create a new user
router.post("/",  uploadFile('image', 'public/images').single('image'), createUserValidator,createUser);

// Paginated listing of users
router.get("/", paginateUsers);

// Get single user by ID
router.get("/:id", readUser);

// Update user by ID
router.put("/:id", updateUser);

// Soft delete user by ID
router.delete("/:id", removeUser);

router.post("/register",uploadFile('image', 'public/images').single('image'),registerValidator, userRegister);


module.exports = router;
