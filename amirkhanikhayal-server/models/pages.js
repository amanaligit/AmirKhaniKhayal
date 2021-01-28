'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pages.hasMany(models.SubPages, {as: 'SubPages'})
    }
  };
  Pages.init({
    Title: DataTypes.STRING,
    Text: DataTypes.TEXT,
    HTML: DataTypes.TEXT,
    Order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pages',
  });
  return Pages;
};