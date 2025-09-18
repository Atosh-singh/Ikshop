const { Blacklisted } = require("@/models/blacklist");

const logout = async (req, res) => {
  try {
    const token = req.token; // middleware se attach hua token

    if (!token) {
      return res.status(400).json({
        success: false,
        msg: "No token provided.",
      });
    }

    // Add token to blacklist
    await Blacklisted.create({ token });

    res.setHeader('Clear-Site-Data', '"cookies", "storage"');

    return res.status(200).json({
      success: true,
      msg: 'You are logged out successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = { logout };
