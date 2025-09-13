const { body } = require("express-validator");

const permissionAddValidator = [
  body("permission_name")
    .notEmpty() // Ensures the field is not empty
    .withMessage("Permission Name is required"),
];

module.exports = {
  permissionAddValidator,
};
