const router = require('express').Router();

router.get('/', (req, res) => {
  res.statusCode(200);
});

module.exports = router;
