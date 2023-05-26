const BaseService = require('./base.service');

class UserService extends BaseService {
  async checkIsEmailExist(email) {
    const data = await this._findOne({ where: { email } });
    if (!!data) {
      throw ApiError.badRequest(`Email ${email} already exist`);
    }
  }
}

module.exports = UserService;
