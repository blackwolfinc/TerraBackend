const { check, body } = require('express-validator');

const promoValidator = [
  check('title')
    .exists()
    .withMessage('Must have title')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('description')
    .exists()
    .withMessage('Must have description')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('category')
    .exists()
    .withMessage('Must have category')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string')
    .bail()
    .isIn(['STANDARD', 'SPECIAL'])
    .withMessage('Promo category must be one of the following values: STANDARD, SPECIAL'),
];

module.exports = promoValidator;
