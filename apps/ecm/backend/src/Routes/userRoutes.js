// Routes/userRoutes.js
const express = require("express");
const router = express.Router();

// Validators
const { createUserValidator } = require("../middlewares/validators/AuthValidator");

// Controllers
const createUser = require("@/controllers/AuthController/AuthCrud/create");
const listUsers = require("@/controllers/AuthController/AuthCrud/index");
const readUser = require("@/controllers/AuthController/AuthCrud/read");
const updateUser = require("@/controllers/AuthController/AuthCrud/update");
const removeUser = require("@/controllers/AuthController/AuthCrud/remove");
const paginateUsers = require("@/controllers/AuthController/AuthCrud/pagination");

// ---- Auth/User CRUD Routes ----
router.post("/", createUserValidator, createUser); // Create
router.get("/", listUsers); // List all
router.get("/paginate", paginateUsers); // Pagination
router.get("/:id", readUser); // Read single
router.put("/:id", updateUser); // Update
router.delete("/:id", removeUser); // Soft Delete

module.exports = router;
