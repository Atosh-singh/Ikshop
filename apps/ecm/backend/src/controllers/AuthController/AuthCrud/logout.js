const logout = async (req, res) => {
  try {
    // Logout sirf response bhej raha hai, token handling nahi
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
