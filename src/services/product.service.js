const ApiError = require('../helpers/errorHandler');
const { sequelize } = require('../models');
const BaseService = require('./base.service');

class ProductService extends BaseService {
  async getOneProduct() {
    const product = await this.findOne({ where: { id: this.req.params.id } });

    if (!product) {
      throw ApiError.badRequest('Product not found');
    }

    return product;
  }

  async getAllProducts() {
    const products = await this.findAll();
    return products;
  }

  async createProduct(payload) {
    const productCreated = await sequelize.transaction((t) => {
      return this.create(payload, t);
    });

    return productCreated;
  }

  async updateProduct(payload) {
    await this.getOneProduct();

    const productUpdated = await sequelize.transaction((t) => {
      return this.update(payload, { where: { id: this.req.params.id } }, t);
    });

    if (productUpdated.length > 0) {
      const afterUpdateProduct = await this.getOneProduct();
      return afterUpdateProduct;
    } else {
      throw new Error('Failed update product');
    }
  }

  async deleteProduct() {
    await this.getOneProduct();

    const productDeleted = await sequelize.transaction((t) => {
      return this.remove({ where: { id: this.req.params.id } }, t);
    });

    if (productDeleted > 0) {
      return productDeleted;
    } else {
      throw new Error('Failed delete product');
    }
  }
}

module.exports = ProductService;
