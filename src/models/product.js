'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category,
        { foreignKey: 'category_id' }
      )

      Product.belongsToMany(models.PurchaseOrder, {
        through: 'PurchaseOrder_Detail',
        foreignKey: 'product_id'
      })

      Product.belongsToMany(models.Invertory_Count, {
        through: 'Inventory_Detail',
        foreignKey: 'product_id'
      })
    }

  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    supplier_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    sale_price: DataTypes.INTEGER,
    code: DataTypes.STRING,
    barcode: DataTypes.STRING,
    onHand: DataTypes.INTEGER,
    img: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};