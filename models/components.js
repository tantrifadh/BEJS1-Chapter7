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
      models.Components.belongsToMany(models.Supplier, {
        through: models.Component_Supplier,
        foreignKey: "component_id",
      });

      // relasi many-to-many --> Products
      models.Components.belongsToMany(models.Products, {
        through: models.Product_Components,
        foreignKey: "component_id",
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