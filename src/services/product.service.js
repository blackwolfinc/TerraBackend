const BaseService = require('./base.service');
const db = require('./../models/index');
const { Product, sequelize } = db;

class ProductService extends BaseService {
  async uploadImageSlide(productId, imageSlides) {
    // check product id
    const productService = new ProductService(this.req, Product);
    await productService.getOneData(productId);

    const payload = imageSlides.map((imageSlide) => {
      return {
        productId,
        image_path: imageSlide,
      };
    });

    const data = await sequelize.transaction((t) => {
      return this._createBulk(payload, t);
    });

    return data;
  }
}

module.exports = ProductService;
