// controllers/StaffController/create.js
const { Staff } = require("@/models/staffModel");  // Import your staff model

const createStaff = async (req, res) => {
  try {
    // Destructure data from the request body
    const { name, email } = req.body;

    // Check if name and email are provided
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and Email are required",
      });
    }

    // Create new staff instance
    const staff = new Staff({
      name,
      email,
    });

    // Save the staff member to the database
    const savedStaff = await staff.save();

    // Return the saved staff as a response
    return res.status(201).json({
      success: true,
      message: "Staff created successfully",
      data: savedStaff,
    });
  } catch (error) {
    console.error("Error creating staff:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating staff",
    });
  }
};

module.exports = {createStaff};
