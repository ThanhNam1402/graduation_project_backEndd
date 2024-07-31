'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    client_name: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    client_paid: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    products: DataTypes.JSON,
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};