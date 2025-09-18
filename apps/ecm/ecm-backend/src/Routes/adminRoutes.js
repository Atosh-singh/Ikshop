const express= require('express');

const router = express.Router()

const {addPermission, getPermission, deletePermission, updatePermission} = require ('../controllers/AuthController/admin')

const {permissionAddValidator, permissionDeleteValidator,permissionUpdateValidator } = require("../middlewares/validators/adminValidator.js")
const { authenticate } = require("../middlewares/authenticate"); // Auth middleware
const {onlyAdminAccess} = require('../middlewares/admin/adminMiddleware.js')
 




// PERMISSION ROUTES
router.post("/add-permission", authenticate,onlyAdminAccess, permissionAddValidator, addPermission)

router.get("/get-permission/:id", authenticate, onlyAdminAccess, getPermission);
router.get("/get-permission", authenticate, onlyAdminAccess, getPermission);



router.delete("/delete-permission", authenticate, onlyAdminAccess,permissionDeleteValidator,  deletePermission)
router.put("/update-permission", authenticate, onlyAdminAccess,permissionUpdateValidator,updatePermission )


module.exports= router;