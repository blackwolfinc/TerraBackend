'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSpecImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductSpecImages.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'productSpecImages',
      });
    }
  }
  ProductSpecImages.init(
    {
      productId: DataTypes.INTEGER,
      image_path: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'productSpecImages',
      modelName: 'ProductSpecImages',
    }
  );
  return ProductSpecImages;
};
