'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {

    static associate(models) {
      Supplier.hasOne(models.PurchaseOrder, { foreignKey: 'supplier_id' });
    }
  };
  Supplier.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    city: DataTypes.STRING,
    tax_code: DataTypes.STRING,
    address: DataTypes.STRING,
    note: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Supplier',
  });
  return Supplier;
};