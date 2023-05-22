'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Component_Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Component_Supplier.belongsTo(models.Suppliers, {
        foreignKey: 'supplier_id',
        as: 'suppliers',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' 
      });

      Component_Supplier.belongsTo(models.Components, {
        foreignKey: 'component_id',
        as: 'components',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Component_Supplier.init({
    supplier_id: DataTypes.INTEGER,
    component_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Component_Supplier',
  });
  return Component_Supplier;
};