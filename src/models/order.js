'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Product, {
        through: "Order_Detail",
        foreignKey: "order_id",
      });
    }
  };
  Order.init({
    client_name: DataTypes.STRING,
    client_paid: DataTypes.INTEGER,
    code: DataTypes.STRING,
    status: DataTypes.INTEGER,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};