const { Router } = require('express');
const ProductController = require('../controllers/product.controller');

const router = Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getOneProduct);
router.post('/', ProductController.createProduct);
router.patch('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
