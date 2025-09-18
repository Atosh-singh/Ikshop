// controllers/RightController/create.js
const { Right } = require('@/models/rightModel');  // Import Right model

const createRight = async (req, res) => {
  try {
    const { staff_id, right } = req.body;

    // Check if the required fields are provided
    if (!staff_id || !right) {
      return res.status(400).json({
        success: false,
        message: "Staff ID and Right are required"
      });
    }

    // Create new Right document
    const newRight = new Right({
      staff_id,
      right
    });

    // Save the Right document to the database
    const savedRight = await newRight.save();

    return res.status(201).json({
      success: true,
      message: "Right created successfully",
      data: savedRight
    });
  } catch (error) {
    console.error("Error creating right:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




const updateRight = async (req, res) => {
  try {
    const { staff_id, right } = req.body;  // Get staff_id and the new right from the request body
    const { id } = req.params;  // This is the ID of the right to be updated

    // Check if required fields are provided
    if (!staff_id || !right) {
      return res.status(400).json({
        success: false,
        message: "Staff ID and Right are required"
      });
    }

    // Find the right by ID and update it
    const existingRight = await Right.findById(id);

    if (!existingRight) {
      return res.status(404).json({
        success: false,
        message: "Right not found"
      });
    }

    // Update the right with the new value
    existingRight.right = right;

    // Optionally update staff_id
    if (staff_id) {
      existingRight.staff_id = staff_id;
    }

    // Save the updated right
    const updatedRight = await existingRight.save();

    return res.status(200).json({
      success: true,
      message: "Right updated successfully",
      data: updatedRight
    });

  } catch (error) {
    console.error("Error updating right:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


/////////////


const staffByRight = async (req, res) => {
  try {
    const { right } = req.query; // Get right string from query

    // Check if right is provided
    if (!right) {
      return res.status(400).json({
        success: false,
        message: "Right is required",
      });
    }

    // Find all rights matching the given right string and populate staff details
    const rightData = await Right.find({ right }).populate({
      path: 'staff_id',
      select: ["name", "email"], // Select only necessary fields
      options:{
        sort: { name: 1 } ,// Sort staff by name in ascending order
        limit:2
      }
    });

    if (!rightData || rightData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No staff found for this right",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Staff fetched successfully for right '${right}'`,
      data: rightData,
    });
  } catch (error) {
    console.error("Error fetching staff by right:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




module.exports = {createRight, updateRight, staffByRight};
