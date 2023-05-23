const { Router } = require('express');
const productRouters = require('./product.router');
const blogRouters = require('./blog.router');
const userRouters = require('./user.router');
const apiKeyAuthentication = require('../middlewares/apiKeyAuthentication');
const responseHandler = require('../helpers/responseHandler');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route inside /index.js yaaa');
});

router.use('/product', apiKeyAuthentication, productRouters);
router.use('/blog', apiKeyAuthentication, blogRouters);
router.use('/user', apiKeyAuthentication, userRouters);

module.exports = router;
