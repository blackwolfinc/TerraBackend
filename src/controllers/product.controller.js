const responseHandler = require('../helpers/responseHandler');
const ProductService = require('../services/product.service');
const db = require('./../models/index');
const { Product, ProductImageSlide, sequelize } = db;
const path = require('path');

class ProductController {
  static async getOne(req, res, next) {
    const service = new ProductService(req, Product);
    try {
      const result = await service.getOneData(req.params.id);
      return responseHandler.succes(res, `Success get ${service.db.name}`, result);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    const service = new ProductService(req, Product);
    try {
      const result = await service.getAllDatas();
      return responseHandler.succes(res, `Success get all ${service.db.name}s`, result);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const service = new ProductService(req, Product);
    try {
      const result = await service.createData(req.body);
      return responseHandler.succes(res, `Success create ${service.db.name}`, result);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const service = new ProductService(req, Product);
    try {
      const result = await service.updateData(req.body, { id: req.params.id });
      return responseHandler.succes(res, `Success update ${service.db.name}`, result);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const service = new ProductService(req, Product);
    try {
      await service.deleteData(req.params.id);
      return responseHandler.succes(res, `Success delete ${service.db.name}`);
    } catch (error) {
      next(error);
    }
  }

  static async uploadImageDenah(req, res, next) {
    const service = new ProductService(req, Product);
    try {
      let image_denah_path = req.fileImageNames[0];
      await service.updateData({ image_denah_path }, { id: req.params.productId });
      return responseHandler.succes(res, `Success upload image ${service.db.name}`);
    } catch (error) {
      next(error);
    }
  }

  static async uploadImageSlide(req, res, next) {
    const service = new ProductService(req, ProductImageSlide);
    try {
      await service.uploadImageSlide(Number(req.params.productId), req.fileImageNames);
      return responseHandler.succes(res, `Success upload image ${service.db.name}`);
    } catch (error) {
      next(error);
    }
  }

  static async downloadImage(req, res, next) {
    const service = new ProductService(req, Product);
    try {
      await service.getOneData(Number(req.params.productId));
      return res.sendFile(path.join(__dirname, `../../../images/${req.query.image}`));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
