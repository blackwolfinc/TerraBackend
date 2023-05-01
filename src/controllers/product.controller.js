const responseHandler = require('../helpers/responseHandler');
const ProductService = require('../services/product.service');
const db = require('./../models/index');
const { Product, sequelize } = db;

class ProductController {
  static async getOneProduct(req, res, next) {
    const productService = new ProductService(req, Product);
    try {
      const getProduct = await productService.getOneProduct();
      return responseHandler.succes(res, 'Success get product', getProduct);
    } catch (error) {
      next(error);
    }
  }

  static async getAllProducts(req, res, next) {
    const productService = new ProductService(req, Product);
    try {
      const getProducts = await productService.getAllProducts();
      return responseHandler.succes(res, 'Success get products', getProducts);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    const productService = new ProductService(req, Product);
    try {
      const getProducts = await productService.createProduct(req.body);
      return responseHandler.succes(res, 'Success create product', getProducts);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    const productService = new ProductService(req, Product);
    try {
      const getProducts = await productService.updateProduct(req.body);
      return responseHandler.succes(res, 'Success update product', getProducts);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    const productService = new ProductService(req, Product);
    try {
      await productService.deleteProduct();
      return responseHandler.succes(res, 'Success delete product');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
