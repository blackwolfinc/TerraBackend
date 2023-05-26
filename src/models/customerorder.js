'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CustomerOrder.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'customerOrders',
      modelName: 'CustomerOrder',
    }
  );
  return CustomerOrder;
};
