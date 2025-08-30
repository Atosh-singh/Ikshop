// Routes/userRoutes.js
const express = require("express");
const router = express.Router();
const fs = require('fs');


 





// Controllers
const { mailVerification } = require("../controllers/AuthController/AuthCrud");


router.get("/mail-verification", mailVerification)



module.exports = router;
