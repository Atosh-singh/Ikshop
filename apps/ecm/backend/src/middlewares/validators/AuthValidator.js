 const { body } = require("express-validator");

const createUserValidator = [
  body("fullname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Full name is required"),

  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail({ gmail_remove_dots: true }),

  body('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Phone number must be exactly 10 digits')
    .isNumeric()
    .withMessage('Phone number must contain only numbers'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&]/)
    .withMessage('Password must contain at least one special character (e.g. @$!%*?&)'),

  body("role")
    .optional()
    .isMongoId()
    .withMessage("Role must be a valid MongoDB Object ID"),

  body("isAdmin")
    .optional()
    .isBoolean()
    .withMessage("isAdmin must be a boolean"),

  body("enabled")
    .optional()
    .isBoolean()
    .withMessage("enabled must be a boolean"),

  body("mobile_access")
    .optional()
    .isBoolean()
    .withMessage("mobile_access must be a boolean"),

  // Optional: remove image validation from here if already handled in upload middleware
  body('image')
    .custom((value, { req }) => {
      if (req.file) {
        const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!fileTypes.includes(req.file.mimetype)) {
          throw new Error('Only .jpeg, .jpg, .png formats are allowed!');
        }
      }
      return true;
    })
    .withMessage('Invalid image file. Allowed formats are .jpeg, .jpg, .png'),
];

const sendMailVerificationValidator = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail({ gmail_remove_dots: true }),
];

const passwordResetValidator = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail({ gmail_remove_dots: true }),
];





const loginValidator = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail({ gmail_remove_dots: true }),
  body("username")
    .optional()
    .isString()
    .withMessage("Username must be a string"),

     body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];



const updateProfileValidator = [
 

   body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Phone number must be exactly 10 digits')
    .isNumeric()
    .withMessage('Phone number must contain only numbers'),



 
]; 

module.exports = {
  createUserValidator,
  sendMailVerificationValidator,
  passwordResetValidator,
  loginValidator,
  updateProfileValidator
};


