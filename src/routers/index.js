const { Router } = require('express');
const productRouters = require('./product.router');
const blogRouters = require('./blog.router');
const userRouters = require('./user.router');
const apiKeyAuthentication = require('../middlewares/apiKeyAuthentication');
const responseHandler = require('../helpers/responseHandler');
const authRouters = require('./auth.router');
const partnerRouters = require('./partner.router');
const galleryRouters = require('./gallery.router');
const customerRouters = require('./customer.router');

const router = Router();

router.get('/test', (req, res, next) => {
  responseHandler.succes(res, 'Test route inside /index.js');
});

router.use('/auth', authRouters);
router.use('/product', apiKeyAuthentication, productRouters);
router.use('/blog', apiKeyAuthentication, blogRouters);
router.use('/user', apiKeyAuthentication, userRouters);
router.use('/partner', apiKeyAuthentication, partnerRouters);
router.use('/gallery', apiKeyAuthentication, galleryRouters);
router.use('/customer', apiKeyAuthentication, customerRouters);

module.exports = router;
