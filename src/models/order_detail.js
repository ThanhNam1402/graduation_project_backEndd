'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Detail extends Model {

    static associate(models) {
    }
  };
  Order_Detail.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    sale_price: DataTypes.INTEGER, 
    type: DataTypes.INTEGER, 
  }, {
    sequelize,
    modelName: 'Order_Detail',
  });
  return Order_Detail;
};