const {
  createUser,
  mailVerification,
  sendMailVerification,
} = require("./UserCreate");
const paginateUsers = require("./paginate");
const readUser = require("./read");
const updateUser = require("./update");
const {removeUser} = require("./remove");

const { loginUser, refreshToken } = require("./login");
const { forgotPassword } = require("./forgotPassword");
const {
  showResetForm,
  resetPassword,
  resetSuccess,
} = require("./resetPassword");
const { userProfile, updateProfile, removeProfile } = require("./UserProfile");
const { logout } = require("./logout");
const { sendOtp, verifyOtp } = require("./otp");

module.exports = {
  createUser,
  paginateUsers,
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
  updateProfile,
  refreshToken,
  logout,
  sendOtp,
  verifyOtp,
  removeProfile
  
};
