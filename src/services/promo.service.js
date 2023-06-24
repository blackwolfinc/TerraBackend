const BaseService = require('./base.service');

class PromoService extends BaseService {
  async getAllPromos() {
    const datas = await this._findAll({ where: {} }, 'category', 'ASC');
    return datas;
  }
}

module.exports = PromoService;
