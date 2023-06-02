const { check, body } = require('express-validator');

const updateCustomerValidator = [
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
    .if(body('name').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('phone')
    .if(body('phone').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
];

module.exports = updateCustomerValidator;
