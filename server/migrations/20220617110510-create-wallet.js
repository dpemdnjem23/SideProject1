'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('wallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
   
      name: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.INTEGER
      },
      start_date: {
        type: Sequelize.STRING
      },
      cycledDay: {
        type: Sequelize.INTEGER
      },
      cycleMonth: {
        type: Sequelize.INTEGER
      },
      cycleYear: {
        type: Sequelize.INTEGER
      },
      image:{
        type:Sequelize.STRING
      },
      end_date:{
        type:Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('wallets');
    await queryInterface.dropTable('Wallets');
  }
};