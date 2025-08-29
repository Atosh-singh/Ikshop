// controllers/AuthController/AuthCrud/index.js
const {createUser,userRegister }= require('./create');  // Create user
const paginateUsers = require('./paginate');  // Paginate users (listUsers functionality)
const readUser = require('./read');      // Read single user by ID
const updateUser = require('./update');  // Update user by ID
const removeUser = require('./remove');  // Soft delete user

module.exports = {
  createUser,
  userRegister,
  paginateUsers,  // Export paginateUsers as the function for listing users with pagination
  readUser,
  updateUser,
  removeUser
};
