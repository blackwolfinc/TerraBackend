const BaseService = require('./base.service');

class ProductService extends BaseService {
  async uploadImageSlide(productId, imageSlides) {
    await this.getOneData(productId);

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
