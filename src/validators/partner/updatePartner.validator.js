const { check, body } = require('express-validator');

const updatePartnerValidator = [
  check('title')
    .if(body('title').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('link')
    .if(body('link').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
];

module.exports = updatePartnerValidator;
