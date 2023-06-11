"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class alarm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.alarm.belongsTo(models.wallet, {
        foreignKey: "wallet_id",
        sourceKey: "id",
      });

      models.alarm.belongsTo(models.user, {
        foreignKey: "user_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
      // define association here
    }
  }
  alarm.init(
    {
      image: DataTypes.STRING,
      user_id: DataTypes.NUMBER,
      title: DataTypes.STRING,
      read: DataTypes.BOOLEAN,
      readAt:DataTypes.DATE,
      remain_time: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "alarm",
    }
  );
  return alarm;
};
