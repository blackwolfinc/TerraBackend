'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.ProductImageSlide, {
        foreignKey: 'productId',
        as: 'productImageSlides',
      });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      image_denah_path: DataTypes.STRING,
      specification: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'products',
      modelName: 'Product',
    }
  );
  return Product;
};
