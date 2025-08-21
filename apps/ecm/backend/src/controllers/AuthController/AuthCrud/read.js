// controllers/AuthController/AuthCrud/read.js
const { User } = require('@/models/User');

const readUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("-password -otp -otpCreatedAt")
      .populate("role", "name permissions")
      .populate("addresses");

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
