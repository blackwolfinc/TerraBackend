const { check, body } = require('express-validator');

const productValidator = [
  check('title')
    .exists()
    .withMessage('Must have title')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('image')
    .exists()
    .withMessage('Must have image input')
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
  check('qty')
    .exists()
    .withMessage('Must have qty')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .custom((value, { req }) => {
      if (typeof value !== 'number') {
        throw new Error('Must be number');
      }

      return true;
    }),
];

module.exports = productValidator;
