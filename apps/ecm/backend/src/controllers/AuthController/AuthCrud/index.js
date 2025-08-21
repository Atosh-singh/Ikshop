// controllers/AuthController/AuthCrud/index.js
const { User } = require("@/models/User");

const listUsers = async (req, res) => {
  try {
    const users = await User.find({ removed: false })
      .select("-password -otp -otpCreatedAt")
      .populate("role", "name permissions")
      .populate("addresses");

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error listing users:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = listUsers;
