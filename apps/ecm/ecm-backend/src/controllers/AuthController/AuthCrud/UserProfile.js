const { User } = require("@/models/User");
const { validationResult } = require("express-validator");
const {deleteFile}=  require("../../../helpers/deleteFile");
const path = require('path');



// GET USER PROFILE
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


// UPDATE USER PROFILE

const updateProfile = async (req, res) => {
  try {
    // Step 1: Validate the request body for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // Step 2: Extract updated data from the request body
    const { username, email, phone } = req.body;
    console.log(`Update profile - username: ${username}, email: ${email}, phone: ${phone}`);

    // Step 3: Prepare the update data object
    const data = {
      username,
      email,
      phone,
    };

    const user_id = req.user._id;

    // Step 4: Handle file upload (image)
    if (req.file !== undefined) {
      data.photo = "images/" + req.file.filename; // Save new image path
      console.log("New Image Path:", data.photo); // Log the new image path

      // Step 5: Fetch current user data
      const oldUser = await User.findById(user_id);
      if (oldUser && oldUser.photo) {
        // Step 6: Get the old image path
        const oldFilePath = path.join(__dirname, "../../../../public/" + oldUser.photo);
        console.log("Old Image Path:", oldFilePath); // Log the old image path
        
        // Step 7: Delete the old image if it exists
        try {
          await deleteFile(oldFilePath);
          console.log("Old Image Deleted Successfully!"); // Log after deletion
        } catch (err) {
          console.error("Error deleting old image:", err.message); // Log any errors during deletion
        }
      }
    }

    // Step 8: Update the user in the database
    const userData = await User.findByIdAndUpdate(user_id, { $set: data }, { new: true });

    // Step 9: Check if the user was updated successfully
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Step 10: Return the updated user data in the response
    return res.status(200).json({
      success: true,
      message: "User profile updated successfully.",
      data: userData, // Return the updated user data
    });
  } catch (error) {
    console.error(`Update profile error:`, error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




const removeProfile= async(req,res) => {
  try {
 const { id } = req.params;
// Soft delete user (mark as removed and disabled)
    const user = await User.findByIdAndUpdate(
      id,
      { 
        removed: true, 
        removedAt: new Date(),
        enabled: false  // Disable user account
      },
      { new: true }
    );

     if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }


    return res.status(200).json({
      success: true,
      message: "User removed successfully (soft delete)",
      data: user
    });


  }catch (error){
    return res.status(500).json({
      status:false,
      message: `Error while removing`,error,
      
    })
  }
}







 




module.exports = {
  userProfile,
  updateProfile,
  removeProfile
};
