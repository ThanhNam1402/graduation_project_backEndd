'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseOrder extends Model {

    static associate(models) {
      PurchaseOrder.belongsTo(models.Supplier,
        { foreignKey: 'supplier_id' }
      )
      PurchaseOrder.belongsToMany(models.Product, {
        through: 'PurchaseOrder_Detail',
        foreignKey: 'purchaseOrder_id'
      })
    }



  };
  PurchaseOrder.init({
    code: DataTypes.STRING,
    supplier_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    note: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PurchaseOrder',
  });
  return PurchaseOrder;
};