const { check, body } = require('express-validator');

const updateUserValidator = [
  check('name')
    .if(body('name').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('email')
    .if(body('email').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isEmail()
    .withMessage('Must be in email format')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('phone')
    .if(body('phone').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string')
    .isNumeric()
    .withMessage('Must be number contained only'),
  check('password')
    .if(body('password').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Must be at least 8 characters'),
  check('role')
    .if(body('role').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string')
    .bail()
    .isIn(['ADMIN'])
    .withMessage('User role must be ADMIN'),
];

module.exports = updateUserValidator;
