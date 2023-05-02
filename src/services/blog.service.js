const ApiError = require('../helpers/errorHandler');
const { sequelize } = require('../models');
const BaseSecondService = require('./baseSecond.service');

class BlogService extends BaseSecondService {
  async getOneBlog() {
    const blog = await this.findOne({ where: { id: this.req.params.id } });

    if (!blog) {
      throw ApiError.badRequest('Blog not found');
    }

    return blog;
  }

  async getAllblogs() {
    const blogs = await this.findAllDatas({});
    return blogs;
  }

  async createBlog(payload) {
    const blogCreated = await sequelize.transaction((t) => {
      return this.create(payload, t);
    });

    return blogCreated;
  }

  async updateBlog(payload) {
    await this.getOneBlog();

    const blogUpdated = await sequelize.transaction((t) => {
      return this.update(payload, { where: { id: this.req.params.id } }, t);
    });

    if (blogUpdated.length > 0) {
      const afterUpdateblog = await this.getOneBlog();
      return afterUpdateblog;
    } else {
      throw new Error('Failed update blog');
    }
  }

  async deleteBlog() {
    await this.getOneBlog();

    const blogDeleted = await sequelize.transaction((t) => {
      return this.remove({ where: { id: this.req.params.id } }, t);
    });

    if (blogDeleted > 0) {
      return blogDeleted;
    } else {
      throw new Error('Failed delete blog');
    }
  }
}

module.exports = BlogService;
