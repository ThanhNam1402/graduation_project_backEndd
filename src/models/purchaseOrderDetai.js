'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseOrder_Detail extends Model {

    static associate(models) {
    }
  };
  PurchaseOrder_Detail.init({
    purchaseOrder_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    price_sale: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PurchaseOrder_Detail',
  });
  return PurchaseOrder_Detail;
};