const { Router } = require('express');
const ProductController = require('../controllers/product.controller');
const responseHandler = require('../helpers/responseHandler');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route product');
});

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getOneProduct);
router.post('/', ProductController.createProduct);
router.patch('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
