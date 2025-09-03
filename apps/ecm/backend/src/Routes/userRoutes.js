const express = require("express");
const router = express.Router();
const uploadFile = require("../utils/uploadFile");

const { createUserValidator, sendMailVerificationValidator,passwordResetValidator, loginValidator } = require("../middlewares/validators/AuthValidator");


const { createUser, mailVerification, sendMailVerification,forgotPassword, showResetForm, resetPassword,resetSuccess, loginUser} = require("../controllers/AuthController/AuthCrud");



// Register new user  and Create a new user
router.post("/", uploadFile('image', 'public/images').single('image'), createUserValidator, createUser);


// Mail verification endpoint
router.get("/mail-verification", mailVerification);

// Resend verification email

router.post("/resend-mail-verification", sendMailVerificationValidator, sendMailVerification);

router.post("/forgot-password" , passwordResetValidator,forgotPassword )

// Reset password form (EJS)
router.get("/reset-password", showResetForm);

// Reset password submit
router.post("/reset-password", resetPassword);

// Reset password success page
router.get("/reset-success", resetSuccess);

// Login user
router.post("/login", loginValidator,loginUser )

module.exports = router;






