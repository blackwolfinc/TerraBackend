const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const responseHandler = require('../helpers/responseHandler');
const isAuthenticate = require('../middlewares/authentication');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route auth');
});

router.post('/login', AuthController.login);
router.post('/logout', isAuthenticate, AuthController.logout);

module.exports = router;
