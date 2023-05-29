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
  check('description')
    .exists()
    .withMessage('Must have description')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('image_denah_path')
    .if(body('image_denah_path').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('specification')
    .exists()
    .withMessage('Must have specification')
    .bail()
    .isArray()
    .withMessage('Must be array')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty'),
  check('specification.*')
    .if(body('specification').exists())
    .isString()
    .withMessage('Must be string'),
];

module.exports = productValidator;
