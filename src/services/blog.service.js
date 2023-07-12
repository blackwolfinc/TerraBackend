const BaseService = require('./base.service');
const tagHTMLRemover = require('./../helpers/tagHTMLRemover');
const { Op } = require('sequelize');

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

  async getAllBlogs() {
    const { preview, search, searchCategory, startDate, endDate } = this.req.query;

    let obj = {};
    if (startDate && endDate) {
      obj = {
        title: search,
        category: searchCategory,
        dateRange: [startDate, endDate],
      };
    } else {
      obj = {
        title: search,
        category: searchCategory,
        startDate,
        endDate,
      };
    }

    let objAssigned = {};
    for (const i in obj) {
      if (obj[i] && i === 'dateRange') {
        objAssigned['createdAt'] = {
          [Op.gte]: obj[i][0],
          [Op.lte]: obj[i][1],
        };
        continue;
      } else if (obj[i] && i === 'startDate') {
        objAssigned['createdAt'] = { [Op.gte]: startDate };
        continue;
      } else if (obj[i] && i === 'endDate') {
        objAssigned['createdAt'] = { [Op.lte]: endDate };
        continue;
      } else if (obj[i]) {
        objAssigned[i] = { [Op.like]: `%${obj[i]}%` };
      }
    }

    let whereQuery = {
      [Op.and]: objAssigned,
    };

    let datas = await this._findAll({ where: whereQuery }, 'createdAt');

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
