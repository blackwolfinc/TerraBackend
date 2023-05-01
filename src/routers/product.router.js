const { Router } = require('express');
const ProductController = require('../controllers/product.controller');

const router = Router();

router.get('/', ProductController.getProduct);
router.get('/:id');
router.post('/');
router.patch('/:id');
router.delete('/:id');

module.exports = router;
