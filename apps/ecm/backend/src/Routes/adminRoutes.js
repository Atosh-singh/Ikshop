const express= require('express');

const router = express.Router()

const {addPermission} = require ('../controllers/AuthController/admin')

const {permissionAddValidator } = require("../middlewares/validators/adminValidator.js")

 


router.post("/add-permission", permissionAddValidator, addPermission)


module.exports= router;