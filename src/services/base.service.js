const ApiError = require('../helpers/errorHandler');
const { sequelize } = require('../models');
const BaseRepository = require('../repositories/base.repository');

class BaseService extends BaseRepository {
  async getOneData(paramId) {
    const data = await this.findOne({ where: { id: paramId } });
    if (!data) {
      throw ApiError.badRequest(`${this.db.name} not found`);
    }
    return data;
  }

  async getAllDatas(whereQuery = {}) {
    const datas = await this.findAll(whereQuery);
    return datas;
  }

  async createData(payload) {
    const data = await sequelize.transaction((t) => {
      return this.create(payload, t);
    });
    return data;
  }

  async updateData(payload, whereQuery) {
    await this.getOneData(whereQuery.id);
    const data = await sequelize.transaction((t) => {
      return this.update(payload, { where: { ...whereQuery } }, t);
    });
    if (data.length > 0) {
      const afterUpdateData = await this.getOneData(whereQuery.id);
      return afterUpdateData;
    } else {
      throw new Error(`Failed update ${this.db.name}`);
    }
  }

  async deleteData(paramId) {
    await this.getOneData(paramId);
    const dataDeleted = await sequelize.transaction((t) => {
      return this.remove({ where: { id: paramId } }, t);
    });
    if (dataDeleted > 0) {
      return dataDeleted;
    } else {
      throw new Error(`Failed delete ${this.db.name}`);
    }
  }
}

module.exports = BaseService;
