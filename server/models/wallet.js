'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  wallet.init({
    user_id: DataTypes.NUMBER,
    name: DataTypes.STRING,
    cost: DataTypes.NUMBER,
    start_date: DataTypes.DATE,
    cycle: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'wallet',
  });
  return wallet;
};