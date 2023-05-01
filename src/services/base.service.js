class BaseService {
  constructor(req, db) {
    this.db = db;
    this.req = req;
  }

  async findOne(query) {
    let data = await this.db.findOne(query);
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
  }

  async findAll(query) {
    let datas = await this.db.findAll(query);
    datas = JSON.stringify(datas);
    datas = JSON.parse(datas);
    return datas;
  }

  async create(payload, transaction) {
    const createdData = await this.db.create(payload, transaction);
    return createdData;
  }

  async update(payload, query, transaction) {
    const updatedData = await this.db.update(payload, query, transaction);
    return updatedData;
  }

  async remove(query, transaction) {
    const deletedData = await this.db.destroy(query, transaction);
    return deletedData;
  }
}

module.exports = BaseService;
