const responseHandler = require('../helpers/responseHandler');

class ProductController {
  static getProduct(req, res, next) {
    try {
      return responseHandler.succes(res, 'Success yaa');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
