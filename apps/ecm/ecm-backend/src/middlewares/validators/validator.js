const { body } = require("express-validator");
const {param} = require("express-validator");
const {check } = require("express-validator");

const categoryAddValidator = [
  body("name")
    .notEmpty() // Ensures the field is not empty
    .withMessage("name is required (Category name ) "),
];

const categoryDeleteValidator = [
  param("identifier") // Validating the identifier (id or slug from params)
    .notEmpty() // Ensures the identifier is not empty
    .withMessage("Category identifier (ID or Slug) is required")
    .custom((value) => {
      // Check if it's a valid MongoDB ObjectId
      if (value.match(/^[0-9a-fA-F]{24}$/)) {
        return true; // Valid ObjectId format
      }
      // If not ObjectId, check if it's a valid slug format (simple alphanumeric + hyphens)
      if (value.match(/^[a-z0-9-]+$/)) {
        return true; // Valid Slug format
      }
      return false; // Invalid identifier (neither ObjectId nor Slug)
    })
    .withMessage("Invalid Category ID or Slug format"),
];



// Validator for update category
const categoryUpdateValidator = [
  // Validating identifier (ID or Slug from params)
  param('identifier')
    .notEmpty()
    .withMessage('Category identifier (ID or Slug) is required')
    .custom((value) => {
      // Check if it's a valid MongoDB ObjectId
      if (value.match(/^[0-9a-fA-F]{24}$/)) {
        return true; // Valid ObjectId format
      }
      // If not ObjectId, check if it's a valid slug format (simple alphanumeric + hyphens)
      if (value.match(/^[a-z0-9-]+$/)) {
        return true; // Valid Slug format
      }
      return false; // Invalid identifier (neither ObjectId nor Slug)
    })
    .withMessage('Invalid Category ID or Slug format'),

  // Validating the 'name' field (category name)
  body('name')
    .notEmpty()
    .withMessage('Category name is required')
    .isString()
    .withMessage('Category name must be a string')
    .trim(),

  // Validating 'parentCategory' if provided (optional, and it must be a valid MongoDB ObjectId if present)
  body('parentCategory')
    .optional()
    .isMongoId()
    .withMessage('Parent Category must be a valid MongoDB ObjectId'),
];



// POST VALIDATOR

const postAddcheckValidator = [
  check('title', 'title is required')   // check() is used in Express Validator to validate specific fields from the request (such as params, body, or query)
  .not().
  isEmpty(),
   check('description', 'description is required')   // check() is used in Express Validator to validate specific fields from the request (such as params, body, or query)
  .not().
  isEmpty(),

]

const postDeletecheckValidator = [
  check('id', 'Id is required')   // check() is used in Express Validator to validate specific fields from the request (such as params, body, or query)
  .not().
  isEmpty(),
 ]
 

 const postUpdatecheckValidator = [
  check('id', 'Id is required')   // check() is used in Express Validator to validate specific fields from the request (such as params, body, or query)
  .not().
  isEmpty(),
  check('title', 'title is required')   // check() is used in Express Validator to validate specific fields from the request (such as params, body, or query)
  .not().
  isEmpty(),
  check('description', 'Description is required')   // check() is used in Express Validator to validate specific fields from the request (such as params, body, or query)
  .not().
  isEmpty(),
 ]

module.exports={
     categoryAddValidator,
  categoryDeleteValidator,
  categoryUpdateValidator,
  postAddcheckValidator,
  postDeletecheckValidator,
  postUpdatecheckValidator,
}