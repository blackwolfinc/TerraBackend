const { Router } = require('express');
const validate = require('../validators/main.validator');
const responseHandler = require('../helpers/responseHandler');
const multerHandlerOne = require('../helpers/multerHandlerOne');
const PromoController = require('../controllers/promo.controller');
const promoValidator = require('../validators/promo/promo.validator');
const updatePromoValidator = require('../validators/promo/updatePromo.validator');
const isAuthenticate = require('../middlewares/authentication');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route promo');
});

router.get('/', PromoController.getAll);
router.get('/:id', PromoController.getOne);

router.use(isAuthenticate);
router.post('/', validate(promoValidator), PromoController.create);
router.patch('/:id', validate(updatePromoValidator), PromoController.update);
router.delete('/:id', PromoController.delete);

router.post('/image/upload/:promoId', multerHandlerOne, PromoController.uploadImage);

module.exports = router;
