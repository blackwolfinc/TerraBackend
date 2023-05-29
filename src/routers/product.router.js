const { Router } = require('express');
const ProductController = require('../controllers/product.controller');
const responseHandler = require('../helpers/responseHandler');
const productValidator = require('../validators/product/product.validator');
const validate = require('./../validators/main.validator');
const path = require('path');
const multerHandlerOne = require('../helpers/multerHandlerOne');
const multerHandlerMany = require('../helpers/multerHandlerMany');
const isAuthenticate = require('../middlewares/authentication');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route product');
});

router.use(isAuthenticate);
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);
router.post('/', validate(productValidator), ProductController.create);
router.patch('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

router.post('/image/denah/upload/:productId', multerHandlerOne, ProductController.uploadImageDenah);
router.post(
  '/image/slide/upload/:productId',
  multerHandlerMany,
  ProductController.uploadImageSlide
);

router.get('/image/download/:productId', ProductController.downloadImage);

module.exports = router;
