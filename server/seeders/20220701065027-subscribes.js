"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "subscribes",
      [
        {
          id: 1,
          sub_name: "넷플릭스",
          image: "subscribes/넷플릭스.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 2,
          sub_name: "쿠팡",
          image: "subscribes/쿠팡.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 3,
          sub_name: "현대셀렉션",
          image: "subscribes/현대셀렉션.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 4,
          sub_name: "해피문데이",
          image: "subscribes/해피문데이.jpeg",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 5,
          sub_name: "티빙",
          image: "subscribes/티빙.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 6,
          sub_name: "필리",
          image: "subscribes/필리.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 7,
          sub_name: "트위치",
          image: "subscribes/트위치.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 8,
          sub_name: "청소연구소",
          image: "subscribes/청소연구소.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 9,
          sub_name: "지니",
          image: "subscribes/지니.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 10,
          sub_name: "유튜브 프리미엄",
          image: "subscribes/유튜브 프리미엄.png",
          createdAt: new Date,
          updatedAt: new Date,
        },

        {
          id: 11,
          sub_name: "윌라",
          image: "subscribes/윌라.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 12,
          sub_name: "위클리셔츠",
          image: "subscribes/위클리셔츠.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 13,
          sub_name: "웨이브",
          image: "subscribes/웨이브.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 14,
          sub_name: "요기요 익스프레스",
          image: "subscribes/요기요 익스프레스.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 15,
          sub_name: "왓챠",
          image: "subscribes/왓챠.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 16,
          sub_name: "와이즐리",
          image: "subscribes/와이즐리.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 17,
          sub_name: "오설록",
          image: "subscribes/오설록.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 18,
          sub_name: "아웃스탠딩",
          image: "subscribes/아웃스탠딩.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 19,
          sub_name: "아마존 프라임",
          image: "subscribes/아마존 프라임.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 20,
          sub_name: "스마일클럽",
          image: "subscribes/스마일클럽.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 21,
          sub_name: "술담화",
          image: "subscribes/술담화.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 22,
          sub_name: "밀리의 서재",
          image: "subscribes/밀리의 서재.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 23,
          sub_name: "멜론",
          image: "subscribes/멜론.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 24,
          sub_name: "리얼후르츠",
          image: "subscribes/리얼후르츠.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 25,
          sub_name: "런드리고",
          image: "subscribes/런드리고.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 26,
          sub_name: "라프텔",
          image: "subscribes/라프텔.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 27,
          sub_name: "네이퍼 플러스",
          image: "subscribes/네이버 플러스.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 28,
          sub_name: "꾸까",
          image: "subscribes/꾸까.png",
          createdAt: new Date,
          updatedAt: new Date,
        },
      ],
      {}
    );
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
