'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Components extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product_Components.belongsTo(models.Products, {
        foreignKey: 'product_id',
        as: 'products',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      Product_Components.belongsTo(models.Components, {
        foreignKey: 'component_id',
        as: 'components',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Product_Components.init({
    product_id: DataTypes.INTEGER,
    component_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_Components',
  });
  return Product_Components;
};