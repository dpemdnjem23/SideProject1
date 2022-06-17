'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Share extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Share.init({
    user_id: DataTypes.NUMBER,
    title: DataTypes.STRING,
    list_sub: DataTypes.ARRAY,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Share',
  });
  return Share;
};