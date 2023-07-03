const responseHandler = require('../helpers/responseHandler');
const db = require('./../models/index');
const { Gallery, GalleryImage, sequelize } = db;
const GalleryService = require('../services/gallery.service');

class GalleryController {
  static async getOne(req, res, next) {
    const service = new GalleryService(req, Gallery);
    try {
      const result = await service.getOneGallery(req.params.id);
      return responseHandler.succes(res, `Success get ${service.db.name}`, result);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    const service = new GalleryService(req, Gallery);
    try {
      const { search } = req.query;
      const result = await service.getAllGalleries(search ? search : null);
      return responseHandler.succes(res, `Success get all Galleries`, result);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const service = new GalleryService(req, Gallery);
    try {
      const result = await service.createData(req.body);
      return responseHandler.succes(res, `Success create ${service.db.name}`, result);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const service = new GalleryService(req, Gallery);
    try {
      const result = await service.updateData(req.body, { id: req.params.id });
      return responseHandler.succes(res, `Success update ${service.db.name}`, result);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const service = new GalleryService(req, Gallery);
    try {
      await service.deleteData(req.params.id);
      return responseHandler.succes(res, `Success delete ${service.db.name}`);
    } catch (error) {
      next(error);
    }
  }

  static async uploadImages(req, res, next) {
    const service = new GalleryService(req, GalleryImage);
    try {
      await service.uploadImages(Number(req.params.galleryId), req.fileImageNames);
      return responseHandler.succes(res, `Success upload image ${service.db.name}`);
    } catch (error) {
      next(error);
    }
  }

  static async deleteImageSlide(req, res, next) {
    const service = new GalleryService(req, GalleryImage);
    try {
      await service.deleteData(req.params.id);
      return responseHandler.succes(res, `Success delete ${service.db.name}`);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMultiImageSlides(req, res, next) {
    const service = new GalleryService(req, GalleryImage);
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

module.exports = GalleryController;
