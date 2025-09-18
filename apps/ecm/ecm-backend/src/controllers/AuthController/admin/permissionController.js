const { User } = require("../../../models/User");
const { Permission } = require("../../../models/PermissionModel");

const { validationResult } = require("express-validator");

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

    const isExist = await Permission.findOne({
      permission_name: {
        $regex: permission_name,
        $options: "i",
      },
    });

    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "Permission Name already Exists",
      });
    }

    var obj = {
      permission_name,
    };

    if (req.body.default) {
      obj.is_default = parseInt(req.body.default);
    }

    const permission = new Permission(obj);
    const newPermission = await permission.save();

    return res.status(200).json({
      success: true,
      message: "Permission added successfully!",
      data: newPermission,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

// GET Permission by ID (params) OR by full filter (body)
const getPermission = async (req, res) => {
  try {
    let permissionData;

    // 1️⃣ Agar URL param se ID di gayi ho
    if (req.params.id) {
      const { id } = req.params;

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          status: false,
          message: "Invalid Permission ID",
        });
      }

      permissionData = await Permission.findById(id);

      if (!permissionData) {
        return res.status(404).json({
          status: false,
          message: "Permission not found with the given ID",
        });
      }
    }
    // 2️⃣ Agar request body me filter diya ho
    else if (req.body && Object.keys(req.body).length > 0) {
      const filter = req.body;
      permissionData = await Permission.find(filter);

      if (!permissionData || permissionData.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No permission found with the given filter",
        });
      }
    }
    // 3️⃣ Simple GET request, na params.id na body
    else {
      permissionData = await Permission.find({}); // saari permissions fetch

      if (!permissionData || permissionData.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No permissions found",
        });
      }
    }

    return res.status(200).json({
      status: true,
      message: "Permission data fetched successfully",
      data: permissionData,
    });
  } catch (error) {
    console.error("Error fetching permission:", error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deletePermission = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.body;

    await Permission.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Permission deletes Successfully!!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePermission = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id, permission_name } = req.body;

    // 1️⃣ Check if the ID exists
    const existingPermission = await Permission.findById(id);

    if (!existingPermission) {
      return res.status(404).json({
        success: false,
        message: "Permission ID not found!!",
      });
    }

    // 2️⃣ Check if the new permission_name is already assigned to another permission
    const nameExists = await Permission.findOne({
      _id: { $ne: id }, // exclude current document
      permission_name:{
        $regex: permission_name,
        $options:"i"
      }

    });

    if (nameExists) {
      return res.status(400).json({
        success: false,
        message: "Permission Name already assigned to another Permission!!",
      });
    }

    // 3️⃣ Prepare the update object
    const updateData = { permission_name };

    if (req.body.default !== undefined || null) {
      updateData.is_default = parseInt(req.body.default);
    }

    // 4️⃣ Update the permission and return the updated document
    const updatedPermission = await Permission.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true } // return the updated document
    );

    return res.status(200).json({
      success: true,
      message: "Permission Updated Successfully!!",
      data: updatedPermission,
    });
  } catch (error) {
    console.error("Error in updatePermission:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addPermission,
  getPermission,
  deletePermission,
  updatePermission,
};
