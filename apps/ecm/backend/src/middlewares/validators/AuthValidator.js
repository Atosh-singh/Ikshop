const { body, param, query } = require("express-validator");

const createUserValidator = [
  body("fullname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("fullname is required"),
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("username min 3 char"),
  body("email").isEmail().withMessage("valid email Required"),
  body("phone").trim().isLength({ min: 8 }).withMessage("valid phone Required"),
  body("password").isLength({ min: 6 }).withMessage("password min 6 chars"),
  body("role").optional().isMongoId().withMessage("role must be a valid id"),
  body("isAdmin").optional().isBoolean(),
  body("enabled").optional().isBoolean(),
  body("mobile_access").optional().isBoolean(),
];








module.exports ={
    createUserValidator,
}