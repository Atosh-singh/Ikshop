const bcrypt = require("bcryptjs");
const { User } = require("@/models/User");
const { PasswordReset } = require("@/models/passwordReset_Forgot");

// Show Reset Password Form
const showResetForm = async (req, res) => {
  const { userId, token } = req.query;

  try {
    const resetRequest = await PasswordReset.findOne({ user_id: userId, token });
    if (!resetRequest) {
      return res.render("reset-password", { error: "Invalid or expired link", userId: null, token: null });
    }

    if (resetRequest.expiresAt < new Date()) {
      await PasswordReset.deleteOne({ _id: resetRequest._id });
      return res.render("reset-password", { error: "Link expired. Please request a new password reset.", userId: null, token: null });
    }

    res.render("reset-password", { userId, token, error: null });
  } catch (error) {
    console.error(error);
    res.render("reset-password", { error: "Server error", userId: null, token: null });
  }
};

// Handle Reset Password Submission
const resetPassword = async (req, res) => {
  try {
    const { userId, token, password, confirmPassword } = req.body;

    // Step 1: Check if passwords match
    if (password !== confirmPassword) {
      return res.render("reset-password", { error: "Password and Confirm Password do not match", userId, token });
    }

    const resetRequest = await PasswordReset.findOne({ user_id: userId, token });
    if (!resetRequest) {
      return res.render("reset-password", { error: "Invalid or expired link", userId: null, token: null });
    }

    if (resetRequest.expiresAt < new Date()) {
      await PasswordReset.deleteOne({ _id: resetRequest._id });
      return res.render("reset-password", { error: "Link expired. Please request a new password reset.", userId: null, token: null });
    }

    // Step 2: Hash and save new password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    // Step 3: Delete reset request entry
    await PasswordReset.deleteOne({ _id: resetRequest._id });

    // Redirect to success page
    return res.redirect("/api/users/reset-success");
  } catch (error) {
    console.error(error);
    res.render("reset-password", { error: "Server error", userId: req.body.userId, token: req.body.token });
  }
};

// Reset Success Page
const resetSuccess = (req, res) => {
  res.render("reset-success");
};

module.exports = { showResetForm, resetPassword, resetSuccess };
