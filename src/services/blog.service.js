const BaseService = require('./base.service');
const tagHTMLRemover = require('./../helpers/tagHTMLRemover');

class BlogService extends BaseService {
  async getOneBlog(paramId, preview) {
    let data = await this._findOne({ where: { id: paramId } });
    if (!data) {
      throw ApiError.badRequest(`${this.db.name} not found`);
    }

    if (preview && preview === 'true') {
      let trimmedBody = data.body.substring(0, 300);
      data.body = tagHTMLRemover(trimmedBody);
    }

    return data;
  }

  async getAllBlogs(preview) {
    let datas = await this._findAll({ where: {} });

    if (preview && preview === 'true') {
      for (const data of datas.datas) {
        let trimmedBody = data.body.substring(0, 300);
        data.body = tagHTMLRemover(trimmedBody);
      }
    }

    return datas;
  }
}

module.exports = BlogService;
