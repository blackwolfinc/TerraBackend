const responseHandler = require('../helpers/responseHandler');
const AuthService = require('../services/user.service');
const db = require('../models/index');
const { checkHash } = require('../helpers/passwordHash');
const UserService = require('../services/user.service');
const { User, sequelize } = db;

class AuthController {
  static async login(req, res, next) {
    const userService = new UserService(req, User);
    try {
      const { email, password } = req.body;

      await userService.checkIsEmailExist(email);

      // const emailRegexp =
      //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      // let user;
      // if (emailRegexp.test(username)) {
      //   user = await User.findOne({ where: { email: username } });
      //   if (!user) throw ApiError.badRequest('Email not found');
      // } else {
      //   user = await User.findOne({ where: { username: username } });
      //   if (!user) throw ApiError.badRequest('Username not found');
      // }

      if (!checkHash(password, user.password)) throw ApiError.badRequest('Your password is wrong');

      const payload = {
        id: user.dataValues.id,
        name: user.dataValues.name,
        username: user.dataValues.username,
        email: user.dataValues.email,
        phone: user.dataValues.phone,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });
      user.update({ token });

      return response.succes(res, 'login success', {
        token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async logout(req, res, next) {
    try {
      await User.update(
        {
          token: null,
        },
        {
          where: { id: req.user.id },
        }
      );

      return response.succes(res, 'logout success');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
