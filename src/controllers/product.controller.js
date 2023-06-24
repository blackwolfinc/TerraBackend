const responseHandler = require('../helpers/responseHandler');
const ProductService = require('../services/product.service');
const db = require('./../models/index');
const { Product, ProductImageSlide, sequelize } = db;
const path = require('path');

class ProductController {
  static async getOne(req, res, next) {
    const service = new ProductService(req, Product);
    try {
      const result = await service.getOneProduct(req.params.id);
      return responseHandler.succes(res, `Success get ${service.db.name}`, result);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    const service = new ProductService(req, Product);
    try {
      const result = await service.getAllProducts();
      return responseHandler.succes(res, `Success get all ${service.db.name}s`, result);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const service = new ProductService(req, Product);
    try {
      req.body.specification = req.body.specification.join(',');
      req.body.facilities = req.body.facilities.join(',');

      const result = await service.createData(req.body);
      return responseHandler.succes(res, `Success create ${service.db.name}`, result);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const service = new ProductService(req, Product);
    try {
      let specification, facilities;
      if (req.body.specification) {
        specification = req.body.specification.join(',');
      }
      if (req.body.facilities) {
        facilities = req.body.facilities.join(',');
      }

      req.body.specification = specification;
      req.body.facilities = facilities;

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

  static async deleteImageSlide(req, res, next) {
    const service = new ProductService(req, ProductImageSlide);
    try {
      await service.deleteData(req.params.id);
      return responseHandler.succes(res, `Success delete ${service.db.name}`);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMultiImageSlides(req, res, next) {
    const service = new ProductService(req, ProductImageSlide);
    try {
      let arr = [];
      for (let i of req.query.images.split(',')) {
        i = i.replace(/\s/g, '');
        arr.push(Number(i));
      }

      await service.deleteImages(arr);
      return responseHandler.succes(res, `Success delete ${service.db.name}s`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
