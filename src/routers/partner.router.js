const { Router } = require('express');
const responseHandler = require('../helpers/responseHandler');
const validate = require('../validators/main.validator');
const multerHandlerOne = require('../helpers/multerHandlerOne');
const isAuthenticate = require('../middlewares/authentication');
const PartnerController = require('../controllers/partner.controller');
const partnerValidator = require('../validators/partner/partner.vallidator');
const updatePartnerValidator = require('../validators/partner/updatePartner.validator');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route partner');
});

router.get('/', PartnerController.getAll);
router.get('/:id', PartnerController.getOne);

router.use(isAuthenticate);
router.post('/', validate(partnerValidator), PartnerController.create);
router.patch('/:id', validate(updatePartnerValidator), PartnerController.update);
router.delete('/:id', PartnerController.delete);

router.post('/image/upload/:partnerId', multerHandlerOne, PartnerController.uploadImage);

module.exports = router;
