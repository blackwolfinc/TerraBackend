'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImageSlide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductImageSlide.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'productImageSlides',
      });
    }
  }
  ProductImageSlide.init(
    {
      productId: DataTypes.INTEGER,
      image_path: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'productImageSlides',
      modelName: 'ProductImageSlide',
    }
  );
  return ProductImageSlide;
};
