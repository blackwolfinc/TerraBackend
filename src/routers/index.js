const { Router } = require('express');
const productRouters = require('./product.router');
const blogRouters = require('./blog.router');
const apiKeyAuthentication = require('../middlewares/apiKeyAuthentication');
const responseHandler = require('../helpers/responseHandler');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route inside /index.js');
});

router.use('/product', apiKeyAuthentication, productRouters);
router.use('/blog', apiKeyAuthentication, blogRouters);

module.exports = router;
