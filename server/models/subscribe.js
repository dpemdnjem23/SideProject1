"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class subscribe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  subscribe.init(
    {
      sub_name: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "subscribe",
    }
  );
  return subscribe;
};
