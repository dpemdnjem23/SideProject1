"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subscribes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      sub_name: {
        type: Sequelize.STRING,
      },

      image: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("subscribes");
  },
};
