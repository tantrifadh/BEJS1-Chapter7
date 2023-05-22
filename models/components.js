'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Components extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Components.hasMany(models.component_suppliers, {
        foreignKey: 'component_id',
        as: 'component_suppliers',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }); 

      // relasi many-to-many --> Products
      Components.hasMany(models.product_components, {
        foreignKey: 'component_id',
        as: 'product_components',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Components.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Components',
  });
  return Components;
};