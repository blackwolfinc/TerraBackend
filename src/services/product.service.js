const BaseService = require('./base.service');
const db = require('./../models/index');
const ApiError = require('../helpers/errorHandler');
const { Op } = require('sequelize');
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
    let data = await this._findOne({
      where: { id: paramId },
      include: this.#includeQuery,
    });
    if (!data) {
      throw ApiError.badRequest(`${this.db.name} not found`);
    }

    data.specification = data.specification ? data.specification.split('|') : [];
    data.facilities = data.facilities ? data.facilities.split('|') : [];

    return data;
  }

  async getAllProducts(search) {
    let whereQuery = {};
    if (!!search) {
      whereQuery = {
        title: {
          [Op.like]: `%${search}%`,
        },
      };
    }

    const datas = await this._findAll({
      where: whereQuery,
      include: this.#includeQuery,
    });

    for (const data of datas.datas) {
      data.specification = data.specification ? data.specification.split('|') : [];
      data.facilities = data.facilities ? data.facilities.split('|') : [];
    }

    return datas;
  }

  #includeQuery = [
    {
      model: ProductImageSlide,
      attributes: ['id', 'image_path'],
      as: 'productImageSlides',
    },
  ];

  async deleteImages(images) {
    const deleteDatas = await this._remove({ where: { id: images } });
    if (deleteDatas === 0) {
      throw ApiError.badRequest('There are no images deleted');
    }

    return deleteDatas;
  }
}

module.exports = ProductService;
