const BaseService = require('./base.service');

class BaseSecondService extends BaseService {
  async findAllDatas(whereQuery) {
    let { paginate, page } = this.req.query;
    let paginationCondition;

    if (paginate && page) {
      paginationCondition = {
        limit: Number(paginate),
        offset: Number(page - 1) * Number(paginate),
      };
    } else {
      paginationCondition = {};
    }

    const [datas, total_datas] = await Promise.all([
      this.findAll({
        where: whereQuery,
        ...paginationCondition,
        order: [['updatedAt', 'DESC']],
      }),
      this.findAll({
        where: whereQuery,
        order: [['updatedAt', 'DESC']],
      }),
    ]);

    return {
      total: total_datas.length,
      datas,
    };
  }
}

module.exports = BaseSecondService;
