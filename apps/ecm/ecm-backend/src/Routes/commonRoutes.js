const express = require("express");
const router = express.Router();

const {authenticate} = require('../middlewares/authenticate');

const {createUserValidator} = require('../middlewares/validators/AuthValidator')





module.exports = router;