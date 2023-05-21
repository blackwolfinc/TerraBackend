const { check, body } = require('express-validator');

const userValidator = [
  check('name')
    .exists()
    .withMessage('Must have name')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('username')
    .exists()
    .withMessage('Must have username')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('email')
    .exists()
    .withMessage('Must have email')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isEmail()
    .withMessage('Must be in email format')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('phone')
    .exists()
    .withMessage('Must have phone')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string')
    .isNumeric()
    .withMessage('Must be number contained only'),
  check('password')
    .exists()
    .withMessage('Must have password')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Must be at least 8 characters'),
];

module.exports = userValidator;
