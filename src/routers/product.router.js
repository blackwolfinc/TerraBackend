const { Router } = require('express');
const ProductController = require('../controllers/product.controller');
const responseHandler = require('../helpers/responseHandler');
const validate = require('./../validators/main.validator');
const productValidator = require('./../validators/product.validator');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route product');
});

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);
router.post('/', validate(productValidator), ProductController.create);
router.patch('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;
