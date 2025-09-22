const { User } = require("@/models/User");
const { validationResult } = require("express-validator");
const { sendMail } = require("../../../utils/mailer");
const { PasswordReset } = require("../../../models/passwordReset_Forgot");
const crypto = require("crypto");

// Generate backend-style reset link
const getResetLink = (userId, token) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:5001";
  return `${baseUrl}/api/users/reset-password?userId=${userId}&token=${token}`;
};

const forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Delete previous tokens
    await PasswordReset.deleteMany({ user_id: user._id });

    // Generate random token
    const token = crypto.randomBytes(32).toString("hex");

    // Save token in DB
    const reset = new PasswordReset({
      user_id: user._id,
      token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min
    });
    await reset.save();

    // Send email
    const msg = `
      <p>Hi ${user.fullname},</p>
      <p>You requested to reset your password. Click the link below:</p>
      <a href="${getResetLink(user._id, token)}">Reset Password</a>
      <p>This link expires in 15 minutes.</p>
    `;
    await sendMail(user.email, "Password Reset Request", msg);

    return res.status(200).json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { forgotPassword };
