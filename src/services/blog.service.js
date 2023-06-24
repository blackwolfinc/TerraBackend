const BaseService = require('./base.service');
const tagHTMLRemover = require('./../helpers/tagHTMLRemover');

class BlogService extends BaseService {
  async getOneBlog(paramId) {
    let data = await this._findOne({ where: { id: paramId } });
    if (!data) {
      throw ApiError.badRequest(`${this.db.name} not found`);
    }

    let trimmedBody = data.body.substring(0, 300);
    data.body = tagHTMLRemover(trimmedBody);

    return data;
  }

  async getAllBlogs(whereQuery = {}) {
    let datas = await this._findAll({ where: whereQuery });

    for (const data of datas.datas) {
      let trimmedBody = data.body.substring(0, 300);
      data.body = tagHTMLRemover(trimmedBody);
    }

    return datas;
  }
}

module.exports = BlogService;
