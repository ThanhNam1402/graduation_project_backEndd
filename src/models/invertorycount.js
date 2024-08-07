"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventory_Count extends Model {
    static associate(models) {
      Inventory_Count.belongsToMany(models.Product, {
        through: "Inventory_Detail",
        foreignKey: "inventory_count_id",
      });
    }
  }
  Inventory_Count.init(
    {
      code: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Inventory_Count",
    }
  );
  return Inventory_Count;
};
