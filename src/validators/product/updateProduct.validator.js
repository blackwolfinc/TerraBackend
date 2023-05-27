const { check, body } = require('express-validator');

const productValidator = [
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
  check('image_denah_path')
    .if(body('image_denah_path').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
  check('specification')
    .if(body('specification').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
];

module.exports = productValidator;
