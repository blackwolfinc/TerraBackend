const BaseService = require('./base.service');

class UserService extends BaseService {
  async checkIsEmailExist(email) {
    const data = await this.findOne({ where: { email } });
    if (!!data) {
      throw ApiError.badRequest(`Email ${email} already exist`);
    }
  }
}

module.exports = UserService;
