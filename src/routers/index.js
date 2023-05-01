const { Router } = require('express');
const productRouters = require('./product.router');
const blogRouters = require('./blog.router');
const apiKeyAuthentication = require('../middlewares/apiKeyAuthentication');

const router = Router();

router.use('/product', apiKeyAuthentication, productRouters);
router.use('/blog', apiKeyAuthentication, blogRouters);

module.exports = router;
