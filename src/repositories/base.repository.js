class BaseRepository {
  constructor(req, db) {
    this.db = db;
    this.req = req;
  }

  async #jsonParseHandler(data) {
    let stringifyData = JSON.stringify(data);
    return JSON.parse(stringifyData);
  }

  async _findOne(query) {
    let data = await this.db.findOne(query);
    return this.#jsonParseHandler(data);
  }

  async _findAll(query, fieldOrder = 'updatedAt', ascDescOrder = 'DESC') {
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
      this.db.findAll({
        ...query,
        ...paginationCondition,
        order: [[fieldOrder, ascDescOrder]],
      }),
      this.db.findAll({
        ...query,
        order: [[fieldOrder, ascDescOrder]],
      }),
    ]);

    const [resultDatas, resultTotalDatas] = await Promise.all([
      this.#jsonParseHandler(datas),
      this.#jsonParseHandler(total_datas),
    ]);

    return {
      total: resultTotalDatas.length,
      datas: resultDatas,
    };
  }

  async _create(payload, transaction) {
    const createdData = await this.db.create(payload, transaction);
    return this.#jsonParseHandler(createdData);
  }

  /* payload is array */
  async _createBulk(payload, transaction) {
    const createdData = await this.db.bulkCreate(payload, transaction);
    return createdData;
  }

  async _update(payload, query, transaction) {
    const updatedData = await this.db.update(payload, query, transaction);
    return updatedData;
  }

  async _remove(query, transaction) {
    const deletedData = await this.db.destroy(query, transaction);
    return deletedData;
  }
}

module.exports = BaseRepository;
