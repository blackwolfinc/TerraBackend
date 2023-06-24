const responseHandler = require('../helpers/responseHandler');
const db = require('../models/index');
const PromoService = require('../services/promo.service');
const { Promo, sequelize } = db;

class PromoController {
  static async getOne(req, res, next) {
    const service = new PromoService(req, Promo);
    try {
      const result = await service.getOneData(req.params.id);
      return responseHandler.succes(res, `Success get ${service.db.name}`, result);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    const service = new PromoService(req, Promo);
    try {
      const result = await service.getAllPromos();
      return responseHandler.succes(res, `Success get all ${service.db.name}s`, result);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const service = new PromoService(req, Promo);
    try {
      // jika category == SPECIAL, data yang lain diubah jadi STANDARD
      let result;
      if (req.body.category === 'SPECIAL') {
        const { datas } = await service.getAllDatas({ category: 'SPECIAL' });

        await Promise.all(
          datas.map(async (data) => {
            await service.updateData({ category: 'STANDARD' }, { id: data.id });
          })
        );

        result = await service.createData(req.body);
      } else {
        result = await service.createData(req.body);
      }

      return responseHandler.succes(res, `Success create ${service.db.name}`, result);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const service = new PromoService(req, Promo);
    try {
      // jika category == SPECIAL, data yang lain diubah jadi STANDARD
      let result;
      if (req.body.category === 'SPECIAL') {
        const { datas } = await service.getAllDatas({ category: 'SPECIAL' });

        await Promise.all(
          datas.map(async (data) => {
            await service.updateData({ category: 'STANDARD' }, { id: data.id });
          })
        );

        result = await service.updateData(req.body, { id: req.params.id });
      } else {
        result = await service.updateData(req.body, { id: req.params.id });
      }

      return responseHandler.succes(res, `Success update ${service.db.name}`, result);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const service = new PromoService(req, Promo);
    try {
      await service.deleteData(req.params.id);
      return responseHandler.succes(res, `Success delete ${service.db.name}`);
    } catch (error) {
      next(error);
    }
  }

  static async uploadImage(req, res, next) {
    const service = new PromoService(req, Promo);
    try {
      let image_path = req.fileImageNames[0];
      await service.updateData({ image: image_path }, { id: req.params.promoId });
      return responseHandler.succes(res, `Success upload image ${service.db.name}`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PromoController;
