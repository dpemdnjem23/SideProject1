"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("shares", [
      {
        id: 1,
        title: "나의 추천 리스트",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡"] },
        nickname: '대머리친구들',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      ,

      {
        id: 2,
        title: "어제 새로 구독 해봤는데요 저는 아직 좋은거같아요",
        description:
          "이제 추천안해요~ ",
        list_sub: { list_sub: ["해피문데이"] },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: "전 요즘 이거봐요...",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        title: "아아 마이크 테스트 입니다...",
        description:
          "왜애ㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐ",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 1,
        title: "무서운 이야기",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: new Date(),
        updatedAt: new Date(),
      },ㅍ
      
    ]);

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
    await queryInterface.bulkDelete("shares", null, {});

    /**
     *
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
