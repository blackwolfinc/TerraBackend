const responseHandler = require('../helpers/responseHandler');
const BlogService = require('../services/blog.service');
const db = require('../models/index');
const { Blog, sequelize } = db;

class BlogController {
  static async getOne(req, res, next) {
    const service = new BlogService(req, Blog);
    try {
      const result = await service.getOneData(req.params.id);
      return responseHandler.succes(res, `Success get ${service.db.name}`, result);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    const service = new BlogService(req, Blog);
    try {
      const result = await service.getAllDatas();
      return responseHandler.succes(res, `Success get all ${service.db.name}s`, result);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const service = new BlogService(req, Blog);
    try {
      const result = await service.createData(req.body);
      return responseHandler.succes(res, `Success create ${service.db.name}`, result);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const service = new BlogService(req, Blog);
    try {
      const result = await service.updateData(req.body, { id: req.params.id });
      return responseHandler.succes(res, `Success update ${service.db.name}`, result);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const service = new BlogService(req, Blog);
    try {
      await service.deleteData(req.params.id);
      return responseHandler.succes(res, `Success delete ${service.db.name}`);
    } catch (error) {
      next(error);
    }
  }

  static async uploadImage(req, res, next) {
    const service = new BlogService(req, Blog);
    try {
      let image_path = req.fileImageNames[0];
      await service.updateData({ image: image_path }, { id: req.params.blogId });
      return responseHandler.succes(res, `Success upload image ${service.db.name}`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BlogController;
