'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.Insert('users',{

      username:xptmxmdyd123,
      password:123,
      nickname:테스트
    
    })
 

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

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
