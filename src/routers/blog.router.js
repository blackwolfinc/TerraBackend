const { Router } = require('express');
const BlogController = require('../controllers/blog.controller');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route blog');
});

router.get('/', BlogController.getAllBlogs);
router.get('/:id', BlogController.getOneBlog);
router.post('/', BlogController.createBlog);
router.patch('/:id', BlogController.updateBlog);
router.delete('/:id', BlogController.deleteBlog);

module.exports = router;
