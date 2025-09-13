const { User } = require("../../../models/User");

const { validationResult } = require("express-validator");

const { Permission } = require("../../../models/PermissionModel");

const addPermission = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { permission_name } = req.body;

    const isExist = await Permission.findOne({ permission_name });

    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "Permission Name already Exists",
      });
    }


var obj = {
    permission_name,

}

if(req.body.default){
    obj.is_default = parseInt(req.body.default);
}


    const permission = new Permission(
      obj
    );

 const newPermission=  await   permission.save();

 return res.status(200).json({
        success: true,
        message: "Permission added successfully!",
        data:newPermission
      });


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

module.exports = {
  addPermission,
};
