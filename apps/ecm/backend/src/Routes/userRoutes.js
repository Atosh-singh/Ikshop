const express = require("express");
const router = express.Router();
const uploadFile = require("../utils/uploadFile");

const {
  createUserValidator,
  sendMailVerificationValidator,
  passwordResetValidator,
  loginValidator,
  updateProfileValidator,
  otpMailValidator,
   verifyOtpValidator
} = require("../middlewares/validators/AuthValidator");

const { authenticate } = require("../middlewares/authenticate"); // Auth middleware

const {
  createUser,
  mailVerification,
  sendMailVerification,
  forgotPassword,
  showResetForm,
  resetPassword,
  resetSuccess,
  loginUser,
  userProfile,
  updateProfile,
  refreshToken,
  logout,
  sendOtp, 
  verifyOtp,
  removeUser,
  deleteUser,
  getdata
} = require("../controllers/AuthController/AuthCrud");

// Register new user
router.post(
  "/",
  uploadFile("image", "public/images").single("image"),
  createUserValidator,
  createUser
);

// Mail verification endpoint
router.get("/mail-verification", mailVerification);

// Resend verification email
router.post(
  "/resend-mail-verification",
  sendMailVerificationValidator,
  sendMailVerification
);

// Forgot password
router.post("/forgot-password", passwordResetValidator, forgotPassword);

// Reset password form (EJS)
router.get("/reset-password", showResetForm);

// Reset password submit
router.post("/reset-password", resetPassword);

// Reset password success page
router.get("/reset-success", resetSuccess);

// Login user
router.post("/login", loginValidator, loginUser);

// Get user profile (requires authentication)
router.get("/profile", authenticate, userProfile);

// Update user profile (requires authentication)
router.post(
  "/update-profile",
  authenticate,
  uploadFile("image", "public/images").single("image"),
  updateProfileValidator,
  updateProfile
);

// Refresh token (requires authentication)
router.get("/refresh-token", authenticate, refreshToken);

// Logout user (requires authentication, simple response only)
router.get("/logout", authenticate, logout);


// otp verification routes

router.post('/send-otp',otpMailValidator, sendOtp )
router.post('/verify-otp',verifyOtpValidator, verifyOtp )



/// delete routes
router.delete('/delete-user', deleteUser )

router.get("/get-data/:id", getdata)

module.exports = router;
