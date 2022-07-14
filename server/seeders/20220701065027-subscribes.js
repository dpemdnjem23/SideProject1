"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("subscribes", [
      {
        id: 1,
        sub_name: "넷플릭스",
        image: "/subscribes/넷플릭스.png",
      },
      {
        id:2,
        sub_name: '쿠팡',
        image: "/subscribes/쿠팡.png",
      }
    ],{});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("subscribes", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
