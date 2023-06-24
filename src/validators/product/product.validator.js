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
  check('facilities')
    .exists()
    .withMessage('Must have facilities')
    .bail()
    .isArray()
    .withMessage('Must be array')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty'),
  check('facilities.*').if(body('facilities').exists()).isString().withMessage('Must be string'),
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
    .isIn(['STANDARD', 'BIG_SALE', 'SUPER_DEAL'])
    .withMessage(
      'Product category must be one of the following values: STANDARD, BIG_SALE, SUPER_DEAL'
    ),
  check('detailProduct')
    .if(body('detailProduct').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
];

module.exports = productValidator;
