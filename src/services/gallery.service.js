const BaseService = require('./base.service');
const db = require('./../models/index');
const ApiError = require('../helpers/errorHandler');
const { Op } = require('sequelize');
const { Gallery, GalleryImage, sequelize } = db;

class GalleryService extends BaseService {
  async uploadImages(galleryId, images) {
    // check gallery id
    const galleryService = new GalleryService(this.req, Gallery);
    await galleryService.getOneData(galleryId);

    const payload = images.map((image_path) => {
      return {
        galleryId,
        image_path: image_path,
      };
    });

    const data = await sequelize.transaction((t) => {
      return this._createBulk(payload, t);
    });

    return data;
  }

  async getOneGallery(paramId) {
    let data = await this._findOne({
      where: { id: paramId },
      include: this.#includeQuery,
    });
    if (!data) {
      throw ApiError.badRequest(`${this.db.name} not found`);
    }

    return data;
  }

  async getAllGalleries(search) {
    let whereQuery = {};
    if (!!search) {
      whereQuery = {
        title: {
          [Op.like]: `%${search}%`,
        },
      };
    }

    const datas = await this._findAll({
      where: whereQuery,
      include: this.#includeQuery,
    });

    return datas;
  }

  #includeQuery = [
    {
      model: GalleryImage,
      attributes: ['id', 'image_path'],
      as: 'galleryImages',
    },
  ];

  async deleteImages(images) {
    const deleteDatas = await this._remove({ where: { id: images } });
    if (deleteDatas === 0) {
      throw ApiError.badRequest('There are no images deleted');
    }

    return deleteDatas;
  }
}

module.exports = GalleryService;
