const { check } = require('express-validator');

exports.registerValidator = [
  // Fullname validation
  check('fullname')
    .not()
    .isEmpty()
    .withMessage('Name is required'),

  // Email validation
  check('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail({
      gmail_remove_dots: true, // Remove dots from Gmail addresses
    }),

  // Phone number validation
  check('phone')
    .not()
    .isEmpty()
    .withMessage('Phone number is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Phone number must be exactly 10 digits')
    .isNumeric()
    .withMessage('Phone number must contain only numbers'),

  // Password validation (Industry standards)
  check('password')
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

  // Image validation (only when a file is uploaded)
  check('image')
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
