const { Router } = require('express');
const BlogController = require('../controllers/blog.controller');
const validate = require('./../validators/main.validator');
const blogValidator = require('./../validators/blog/blog.validator');
const responseHandler = require('../helpers/responseHandler');
const updateBlogValidator = require('../validators/blog/updateBlog.validator');
const multerHandlerOne = require('../helpers/multerHandlerOne');
const isAuthenticate = require('../middlewares/authentication');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route blog');
});

router.use(isAuthenticate);
router.get('/', BlogController.getAll);
router.get('/:id', BlogController.getOne);
router.post('/', validate(blogValidator), BlogController.create);
router.patch('/:id', validate(updateBlogValidator), BlogController.update);
router.delete('/:id', BlogController.delete);

router.post('/image/upload/:blogId', multerHandlerOne, BlogController.uploadImage);

module.exports = router;
