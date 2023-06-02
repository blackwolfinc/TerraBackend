const { Router } = require('express');
const responseHandler = require('../helpers/responseHandler');
const validate = require('../validators/main.validator');
const multerHandlerMany = require('../helpers/multerHandlerMany');
const isAuthenticate = require('../middlewares/authentication');
const CustomerController = require('../controllers/customer.controller');
const customerValidator = require('../validators/customer/customer.validator');
const updateCustomerValidator = require('../validators/customer/updateCustomer.validator');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route customer');
});

router.use(isAuthenticate);
router.get('/', CustomerController.getAll);
router.get('/:id', CustomerController.getOne);
router.post('/', validate(customerValidator), CustomerController.create);
router.patch('/:id', validate(updateCustomerValidator), CustomerController.update);
router.delete('/:id', CustomerController.delete);

module.exports = router;
