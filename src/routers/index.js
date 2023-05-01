const { Router } = require('express');
const productRouters = require('./product.router');
const blogRouters = require('./blog.router');

const router = Router();

router.use('/product', productRouters);
router.use('/blog', blogRouters);

module.exports = router;
