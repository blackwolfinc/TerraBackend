const { check, body } = require('express-validator');

const blogValidator = [
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
  check('body')
    .exists()
    .withMessage('Must have body')
    .bail()
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
];

module.exports = blogValidator;
