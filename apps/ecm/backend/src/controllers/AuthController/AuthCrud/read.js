// controllers/AuthController/AuthCrud/read.js
const { User } = require('@/models/User');
const findByIdOrSlug = require('@/utils/findByIdOrSlug');  // Helper to find by ID or Slug

const readUser = async (req, res) => {
  try {
    const { id } = req.params;  // This is either the username or slug

    // Use the helper to search by _id or slug
    let user = await findByIdOrSlug(User, id);

    // If user not found by _id or slug, try searching by fullname
    if (!user) {
      user = await User.findOne({ fullname: new RegExp(id, 'i') }) // Case-insensitive search by fullname
        .select("-password -otp -otpCreatedAt")
        .populate("role", "name permissions")
        .populate("addresses");
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error reading user:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = readUser;
