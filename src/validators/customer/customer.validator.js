const { check, body } = require('express-validator');

const customerValidator = [
  check('email')
    .if(body('email').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string')
    .bail()
    .isEmail()
    .withMessage('Must be in email format'),
  check('name')
    .exists()
    .withMessage('Must have name')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty')
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
    .withMessage('Must be string'),
];

module.exports = customerValidator;
