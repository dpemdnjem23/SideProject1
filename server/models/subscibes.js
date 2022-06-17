'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscibes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subscibes.init({

    sub_name: DataTypes.STRING,

    image: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Subscibes',
  });
  return Subscibes;
};