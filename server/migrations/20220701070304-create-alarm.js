"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("alarms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
     
      title: {
        type: Sequelize.STRING,
      },

      read: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      remain_time:{
        type:Sequelize.INTEGER
      }
,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("alarms");
  },
};
