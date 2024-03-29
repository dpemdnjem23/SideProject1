"use strict";
const { Model } = require("sequelize");
const user = require("./user");
module.exports = (sequelize, DataTypes) => {
  class wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.wallet.belongsTo(models.user, {
        foreignKey: "user_id",
        sourceKey: "id",
        onDelete: "CASCADE",
      });

      models.wallet.hasOne(models.alarm, {
        foreignKey: "wallet_id",
        sourceKey: "id",
        onDelete: "CASCADE",
      });

      // define association here
    }
  }
  wallet.init(
    {
      user_id: DataTypes.NUMBER,
      name: DataTypes.STRING,
      cost: DataTypes.NUMBER,
      start_date: DataTypes.STRING,
      cycleDay: DataTypes.STRING,
      cycleMonth: DataTypes.STRING,
      cycleYear: DataTypes.STRING,

      image: DataTypes.STRING,
      end_date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "wallet",
    }
  );
  return wallet;
};
