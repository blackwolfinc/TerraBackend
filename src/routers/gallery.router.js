const { Router } = require('express');
const responseHandler = require('../helpers/responseHandler');
const validate = require('../validators/main.validator');
const multerHandlerMany = require('../helpers/multerHandlerMany');
const isAuthenticate = require('../middlewares/authentication');
const GalleryController = require('../controllers/gallery.controller');
const galleryValidator = require('../validators/gallery/gallery.validator');
const updateGalleryValidator = require('../validators/gallery/updateGallery.validator');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route gallery');
});

router.get('/', GalleryController.getAll);
router.get('/:id', GalleryController.getOne);

router.use(isAuthenticate);
router.post('/', validate(galleryValidator), GalleryController.create);
router.patch('/:id', validate(updateGalleryValidator), GalleryController.update);
router.delete('/:id', GalleryController.delete);

router.post('/image/upload/:galleryId', multerHandlerMany, GalleryController.uploadImages);

router.delete('/image/:id', GalleryController.deleteImageSlide);
router.delete('/images/array', GalleryController.deleteMultiImageSlides);

module.exports = router;
