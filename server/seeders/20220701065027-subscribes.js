"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert("subscribes", [
    //   {
    //     id: 1,
    //     sub_name: "넷플릭스",
    //     image: "subscribes/넷플릭스.png",
    //   },
    //   {
    //     id:2,
    //     sub_name: '쿠팡',
    //     image: "subscribes/쿠팡.png",
    //   },
    //   {
    //   id:3,
    //   sub_name:"현대셀렉션",
    //   image:"subscribes/현대셀렉션.png"
    //   }
    //   ,
    //   {
    //   id:4,
    //   sub_name:"해피문데이",
    //   image:"subscribes/해피문데이.jpeg"
    //   }
    //   ,
    //   {
    //   id:5,
    //   sub_name:"티빙",
    //   image:"subscribes/티빙.png"
    //   },
    //   {
    //   id:6,
    //   sub_name:"필리",
    //   image:"subscribes/필리.png"
    //   },
    //   {
    //   id:7,
    //   sub_name:"트위치",
    //   image:"subscribes/트위치.png"
    //   },
    //   {
    //   id:8,
    //   sub_name:"청소연구소",
    //   image:"subscribes/청소연구소.png"
    //   },
    //   {
    //   id:9,
    //   sub_name:"지니",
    //   image:"subscribes/지니.png"
    //   },
    //   {
    //   id:10,
    //   sub_name:"유튜브 프리미엄",
    //   image:"subscribes/유튜브 프리미엄.png"
    //   },
      
    //   {
    //   id:11,
    //   sub_name:"윌라",
    //   image:"subscribes/윌라.png"
    //   },
    //   {
    //   id:12,
    //   sub_name:"위클리셔츠",
    //   image:"subscribes/위클리셔츠.png"
    //   },
    //   {
    //   id:13,
    //   sub_name:"웨이브",
    //   image:"subscribes/웨이브.png"
    //   },
    //   {
    //   id:14,
    //   sub_name:"요기요 익스프레스",
    //   image:"subscribes/요기요 익스프레스.png"
    //   },
    //   {
    //   id:15,
    //   sub_name:"왓챠",
    //   image:"subscribes/왓챠.png"
    //   },
    //   {
    //   id:16,
    //   sub_name:"와이즐리",
    //   image:"subscribes/와이즐리.png"
    //   },
    //   {
    //   id:17,
    //   sub_name:"오설록",
    //   image:"subscribes/오설록.png"
    //   },
    //   {
    //   id:18,
    //   sub_name:"아웃스탠딩",
    //   image:"subscribes/아웃스탠딩.png"
    //   },
    //   {
    //   id:19,
    //   sub_name:"아마존 프라임",
    //   image:"subscribes/아마존 프라임.png"
    //   },
    //   {
    //   id:20,
    //   sub_name:"스마일클럽",
    //   image:"subscribes/스마일클럽.png"
    //   },
    //   {
    //   id:21,
    //   sub_name:"술담화",
    //   image:"subscribes/술담화.png"
    //   },
    //   {
    //   id:22,
    //   sub_name:"밀리의 서재",
    //   image:"subscribes/밀리의 서재.png"
    //   },
    //   {
    //   id:23,
    //   sub_name:"멜론",
    //   image:"subscribes/멜론.png"
    //   },
    //   {
    //   id:24,
    //   sub_name:"리얼후르츠",
    //   image:"subscribes/리얼후르츠.png"
    //   },
    //   {
    //   id:25,
    //   sub_name:"런드리고",
    //   image:"subscribes/런드리고.png"
    //   },
    //   {
    //   id:26,
    //   sub_name:"라프텔",
    //   image:"subscribes/라프텔.png"
    //   },
    //   {
    //   id:27,
    //   sub_name:"네이퍼 플러스",
    //   image:"subscribes/네이버 플러스.png"
    //   },
    //   {
    //   id:28,
    //   sub_name:"꾸까",
    //   image:"subscribes/꾸까.png"
    //   }
    // ],{});
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
