'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubPages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubPages.belongsTo(models.Pages, {foreignKey: 'PageId', as: 'Page'})
    }
  };
  SubPages.init({
    Title: DataTypes.STRING,
    Text: DataTypes.TEXT,
    HTML: DataTypes.TEXT,
    PageId: DataTypes.INTEGER,
    Order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubPages',
  });
  return SubPages;
};