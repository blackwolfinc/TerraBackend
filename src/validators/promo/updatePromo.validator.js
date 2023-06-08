const { check, body } = require('express-validator');

const updatePromoValidator = [
  check('title')
    .if(body('title').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('description')
    .if(body('description').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('category')
    .if(body('category').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string')
    .bail()
    .isIn(['STANDARD', 'SPECIAL'])
    .withMessage('Promo category must be one of the following values: STANDARD, SPECIAL'),
];

module.exports = updatePromoValidator;
