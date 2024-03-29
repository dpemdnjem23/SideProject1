'use strict';
const {
  Model
} = require('sequelize');
const alarm = require('./alarm');
const share = require('./share');
const wallet = require('./wallet');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.hasMany(models.alarm,{
        foreignKey:'user_id',
        sourceKey:'id',
      })
      models.user.hasMany(models.share,{
        foreignKey:'user_id',
        sourceKey:'id',
      })
      models.user.hasMany(models.wallet,{
        foreignKey:'user_id',
        sourceKey:'id',
      })
      // define association here
    }
  }
  user.init({
    username: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    salt:DataTypes.STRING,
    kakao_id:DataTypes.STRING,
    google_id:DataTypes.STRING,
    social_user:DataTypes.BOOLEAN,
    isAdmin:DataTypes.BOOLEAN,
    email:DataTypes.STRING

  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};