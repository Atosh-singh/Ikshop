const { User } = require("@/models/User");
const { validationResult } = require("express-validator");

const userProfile = async (req, res) => {
  try {
    // Get user ID from JWT (set by authenticate middleware)
    const userId = req.user._id;

    // Fetch full user data from MongoDB
    const fullUserData = await User.findById(userId)
      .populate("addresses") // populate addresses if any
      .populate("wishlist"); // populate wishlist if any

    if (!fullUserData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Log full user data in console
    console.log("Full User Data:", fullUserData);

    // Send full user data in response
    return res.status(200).json({
      success: true,
      message: "User profile data",
      data: fullUserData,
    });
  } catch (error) {
    console.error(`user profile error:`, error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



const updateProfile = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // Extract updated data from the request body
    const { username, email, phone } = req.body;

    // Log the request body for debugging
    console.log(`Update profile - username: ${username}, email: ${email}, phone: ${phone}`);

    // Prepare the data object for update
    const data = {
      username,
      email,
      phone,
    };

    // Handle file upload (image)
    if (req.file) {
      data.photo = "images/" + req.file.filename; // Save image file path
    }

    // Update the user in the database
    const userData = await User.findByIdAndUpdate(req.user._id, {
      $set: data, // Use $set to update only the fields you want
    }, { new: true }); // Return the updated user data

    // Check if the user was found and updated
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Return the updated user data in the response
    return res.status(200).json({
      success: true,
      message: "User profile updated successfully.",
      data: userData, // Send updated user data
    });
  } catch (error) {
    console.error(`Update profile error:`, error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  userProfile,
  updateProfile,
};
