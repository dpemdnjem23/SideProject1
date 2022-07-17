"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email:{
        type:Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING,
      },
      nickname: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      salt: {
        type: Sequelize.STRING,
      },
      kakao_id: {
        type: Sequelize.STRING,
      },
      google_id: {
        type: Sequelize.STRING,
      },
      social_user: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      isAdmin: {
        
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        // allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        // allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
