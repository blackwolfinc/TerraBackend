const { Router } = require('express');
const BlogController = require('../controllers/blog.controller');
const validate = require('./../validators/main.validator');
const blogValidator = require('./../validators/blog.validator');
const responseHandler = require('../helpers/responseHandler');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route blog');
});

router.get('/', BlogController.getAll);
router.get('/:id', BlogController.getOne);
router.post('/', validate(blogValidator), BlogController.create);
router.patch('/:id', BlogController.update);
router.delete('/:id', BlogController.delete);

module.exports = router;
