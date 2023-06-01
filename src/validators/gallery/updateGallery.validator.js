const { check, body } = require('express-validator');

const updateGalleryValidator = [
  check('title')
    .if(body('title').exists())
    .notEmpty()
    .withMessage('Can not be empty')
    .bail()
    .isString()
    .withMessage('Must be string'),
];

module.exports = updateGalleryValidator;
