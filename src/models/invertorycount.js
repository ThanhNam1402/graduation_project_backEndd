'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invertory_Count extends Model {

    static associate(models) {
      Invertory_Count.belongsToMany(models.Product, {
        through: 'Inventory_Detail',
        foreignKey: 'inventory_count_id'
      })
    }
  };
  Invertory_Count.init({
    qty: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Invertory_Count',
  });
  return Invertory_Count;
};