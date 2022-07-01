"use strict";
const { Model } = require("sequelize");
const user = require("./user");
module.exports = (sequelize, DataTypes) => {
  class share extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      share.belongsTo(user, {
        foreignKey: "user_id",
        sourceKey: "id",
        onDelete: "cascade",
      });
      // define association here
    }
  }
  share.init(
    {
      user_id: DataTypes.NUMBER,
      title: DataTypes.STRING,
      list_sub: DataTypes.JSON,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "share",
    }
  );
  return share;
};
