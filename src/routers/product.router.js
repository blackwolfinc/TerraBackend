const { Router } = require('express');
const ProductController = require('../controllers/product.controller');
const multerHandler = require('../helpers/multerHandler');
const responseHandler = require('../helpers/responseHandler');
const productValidator = require('../validators/product/product.validator');
const validate = require('./../validators/main.validator');
const path = require('path');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route product');
});

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);
router.post('/', validate(productValidator), ProductController.create);
router.patch('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

router.post('/image/upload/:productId', multerHandler, ProductController.uploadImage);
router.get('/image/download', (req, res) => {
  // console.log(path.join(__dirname, '../../../images/image-1685125881824-najib-on-drums.jpeg'));
  return res.sendFile(
    path.join(__dirname, '../../../images/image-1685125881824-najib-on-drums.jpeg')
  ); //harus dikasih '/nama-file-nya'
});

module.exports = router;
