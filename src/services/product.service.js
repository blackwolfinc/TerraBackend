const BaseService = require('./base.service');
const db = require('./../models/index');
const ApiError = require('../helpers/errorHandler');
const { Product, ProductImageSlide, sequelize } = db;

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

  async getOneProduct(paramId) {
    const data = await this._findOne({
      where: { id: paramId },
      include: this.#includeQuery,
    });
    if (!data) {
      throw ApiError.badRequest(`${this.db.name} not found`);
    }

    return data;
  }

  async getAllProducts(whereQuery = {}) {
    const datas = await this._findAll({
      where: whereQuery,
      include: this.#includeQuery,
    });

    return datas;
  }

  #includeQuery = [
    {
      model: ProductImageSlide,
      attributes: ['id', 'image_path'],
      as: 'productImageSlides',
    },
  ];
}

module.exports = ProductService;
