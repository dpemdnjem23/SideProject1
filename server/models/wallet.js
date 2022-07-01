'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      wallet.belongsTo(user, {
        foreignKey: "user_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
      // define association here
    }
  }
  wallet.init({
    user_id: DataTypes.NUMBER,
    name: DataTypes.STRING,
    cost: DataTypes.NUMBER,
    start_date: DataTypes.DATE,
    cycle: DataTypes.NUMBER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'wallet',
  });
  return wallet;
};