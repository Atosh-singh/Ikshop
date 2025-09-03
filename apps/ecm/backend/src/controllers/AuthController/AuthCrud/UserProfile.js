const { User } = require("@/models/User");

const userProfile = async (req, res) => {
  try {
    // Get user ID from JWT (set by authenticate middleware)
    const userId = req.user._id;

    // Fetch full user data from MongoDB
    const fullUserData = await User.findById(userId)
      .populate('addresses') // populate addresses if any
      .populate('wishlist'); // populate wishlist if any

    if (!fullUserData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Log full user data in console
    console.log('Full User Data:', fullUserData);

    // Send full user data in response
    return res.status(200).json({
      success: true,
      message: 'User profile data',
      data: fullUserData,
    });

  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



const updateProfile =async (req, res) =>{

}

module.exports = {
  userProfile,
  updateProfile
};
