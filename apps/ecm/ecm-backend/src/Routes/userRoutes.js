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
   removeUser,


  mailVerification,
  sendMailVerification,

  forgotPassword,
  showResetForm,
  resetPassword,
  resetSuccess,
 
 
  refreshToken,
   loginUser,
  logout,
  sendOtp, 
  verifyOtp,
 

   userProfile,
  updateProfile,
  removeProfile,




 
} = require("../controllers/AuthController/AuthCrud");

// Register new user
router.post(
  "/",
  uploadFile("image", "public/images").single("image"),
  // createUserValidator,
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

// Logout user (requires authentication, simple response only)
router.get("/logout", authenticate, logout);



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

router.delete('/remove-profile', removeProfile)


// Refresh token (requires authentication)
router.get("/refresh-token", authenticate, refreshToken);



// otp verification routes

router.post('/send-otp',otpMailValidator, sendOtp )
router.post('/verify-otp',verifyOtpValidator, verifyOtp )


router.delete('/remove-user', removeUser)


module.exports = router;
