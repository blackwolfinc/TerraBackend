const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const responseHandler = require('../helpers/responseHandler');
const validate = require('../validators/main.validator');
const updateUserValidator = require('../validators/user/updateUser.validator');
const userValidator = require('../validators/user/user.validator');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route user');
});

router.get('/', UserController.getAll);
router.get('/:id', UserController.getOne);
router.post('/', validate(userValidator), UserController.create);
router.patch('/:id', validate(updateUserValidator), UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;
