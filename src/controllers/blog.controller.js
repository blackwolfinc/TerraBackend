const responseHandler = require('../helpers/responseHandler');
const BlogService = require('../services/blog.service');
const db = require('../models/index');
const { Blog, sequelize } = db;

class BlogController {
  static async getOneBlog(req, res, next) {
    const blogService = new BlogService(req, Blog);
    try {
      const getBlog = await blogService.getOneBlog();
      return responseHandler.succes(res, 'Success get blog', getBlog);
    } catch (error) {
      next(error);
    }
  }

  static async getAllBlogs(req, res, next) {
    const blogService = new BlogService(req, Blog);
    try {
      const getBlogs = await blogService.getAllblogs();
      return responseHandler.succes(res, 'Success get blogs', getBlogs);
    } catch (error) {
      next(error);
    }
  }

  static async createBlog(req, res, next) {
    const blogService = new BlogService(req, Blog);
    try {
      const getBlogs = await blogService.createBlog(req.body);
      return responseHandler.succes(res, 'Success create blog', getBlogs);
    } catch (error) {
      next(error);
    }
  }

  static async updateBlog(req, res, next) {
    const blogService = new BlogService(req, Blog);
    try {
      const getBlogs = await blogService.updateBlog(req.body);
      return responseHandler.succes(res, 'Success update blog', getBlogs);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBlog(req, res, next) {
    const blogService = new BlogService(req, Blog);
    try {
      await blogService.deleteBlog();
      return responseHandler.succes(res, 'Success delete blog');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BlogController;
