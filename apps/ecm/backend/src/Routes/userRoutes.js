const express = require("express");
const router = express.Router();
const uploadFile = require("../utils/uploadFile");

const { createUserValidator, sendMailVerificationValidator, passwordResetValidator, loginValidator, updateProfileValidator } = require("../middlewares/validators/AuthValidator");


const  {authenticate } = require('../middlewares/authenticate'); // Import the authenticate middleware

const { createUser, mailVerification, sendMailVerification, forgotPassword, showResetForm, resetPassword, resetSuccess, loginUser, userProfile, updateProfile } = require("../controllers/AuthController/AuthCrud");

// Register new user and Create a new user
router.post("/", uploadFile('image', 'public/images').single('image'), createUserValidator, createUser);

// Mail verification endpoint
router.get("/mail-verification", mailVerification);

// Resend verification email
router.post("/resend-mail-verification", sendMailVerificationValidator, sendMailVerification);

// Forgot password route
router.post("/forgot-password", passwordResetValidator, forgotPassword);

// Reset password form (EJS)
router.get("/reset-password", showResetForm);

// Reset password submit
router.post("/reset-password", resetPassword);

// Reset password success page
router.get("/reset-success", resetSuccess);
 
// Login user (No authentication needed here)
router.post("/login", loginValidator, loginUser);




// Profile user (authenticated)
router.get("/profile", authenticate, userProfile);
router.post("/update-profile", authenticate,uploadFile('image', 'public/images').single('image'),updateProfileValidator,updateProfile )

module.exports = router;
