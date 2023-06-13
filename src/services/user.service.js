const ApiError = require('../helpers/errorHandler');
const BaseService = require('./base.service');

class UserService extends BaseService {
  async getUserByEmail(email) {
    const data = await this._findOne({ where: { email } });
    if (!data) {
      throw ApiError.badRequest(`Email ${email} not found`);
    }

    return data;
  }
}

module.exports = UserService;
