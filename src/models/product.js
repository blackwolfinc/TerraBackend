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
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      image_denah: DataTypes.STRING,
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
