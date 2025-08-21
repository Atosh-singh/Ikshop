// Routes/roleRoutes

const express= require("express");

const router = express.Router();

// Controllers
const {createRole, getRoles } = require("../controllers/RoleController/index");

// create Role
router.post("/", createRole);

// Get All roles
router.get("/", getRoles);

module.exports = router;