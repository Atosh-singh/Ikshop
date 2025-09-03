// controllers/AuthController/AuthCrud/index.js
const {createUser, mailVerification, sendMailVerification,}= require('./UserCreate');  // Create user
const paginateUsers = require('./paginate');  // Paginate users (listUsers functionality)
const readUser = require('./read');      // Read single user by ID
const updateUser = require('./update');  // Update user by ID
const removeUser = require('./remove');  // Soft delete user

const { loginUser } = require('./login'); // Login controller
 
const { forgotPassword } = require('./forgotPassword'); // Forgot password controller


const { showResetForm, resetPassword, resetSuccess } = require('./resetPassword'); // Reset password controllers

const {userProfile, updateProfile} = require('./UserProfile');


module.exports = {
  createUser,
paginateUsers,  // Export paginateUsers as the function for listing users with pagination
  readUser,
  updateUser,
  removeUser,
  mailVerification,
  sendMailVerification,
  forgotPassword,
  showResetForm,
  resetPassword,
  resetSuccess,
  loginUser,
  userProfile,
  updateProfile
  
};
