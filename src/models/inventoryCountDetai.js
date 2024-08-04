'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory_Detail extends Model {

    static associate(models) {
    }
  };
  Inventory_Detail.init({
    inventory_count_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    sale_price: DataTypes.INTEGER, 
    type: DataTypes.INTEGER, 
    EndingStocks: DataTypes.INTEGER, // tồn kho cuối cùng
  }, {
    sequelize,
    modelName: 'Inventory_Detail',
  });
  return Inventory_Detail;
};