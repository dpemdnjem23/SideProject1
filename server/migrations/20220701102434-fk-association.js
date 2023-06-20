"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("alarms", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users", // Users 모델에서
        key: "id", // 그 아이디 값을 참고합니다.
      },
      onDelete:"CASCADE"
    });
    await queryInterface.addColumn("wallets", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users", // Users 모델에서
        key: "id", // 그 아이디 값을 참고합니다.
      },
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("shares", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users", // Users 모델에서
        key: "id", // 그 아이디 값을 참고합니다.
      },

    });

    await queryInterface.addColumn("alarms", "wallet_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "wallets", // Users 모델에서
        key: "id", // 그 아이디 값을 참고합니다.
      },
      onDelete: "CASCADE",
    });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "wallets", // name of Source model
      "user_Id" // key we want to remove
    );
    await queryInterface.removeColumn("alarms", "user_id");


    
    await queryInterface.removeColumn(
      "shares", // name of Source model
      "user_id" // key we want to remove
    );

    await queryInterface.removeColumn(
      "alarms", // name of Source model
      "wallet_id" // key we want to remove
    );
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
