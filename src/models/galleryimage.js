'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GalleryImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GalleryImage.init(
    {
      galleryId: DataTypes.INTEGER,
      image_path: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'galleryImages',
      modelName: 'GalleryImage',
    }
  );
  return GalleryImage;
};
