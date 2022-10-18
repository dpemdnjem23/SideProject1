"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("shares", [
      {
        id: 22,
        title: "나의 추천 리스트",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡"] },
        nickname: '대머리친구들',
        createdAt: "2021-05-17T10:33:54.000Z",
        updatedAt: "2021-05-17T10:33:54.000Z",
      }
      ,

      {
        id: 23,
        title: "어제 새로 구독 해봤는데요 저는 아직 좋은거같아요",
        description:
          "이제 추천안해요~ ",
        list_sub: { list_sub: ["해피문데이"] },
        createdAt: "2021-06-20T18:33:54.000Z",
        updatedAt: "2021-06-20T18:33:54.000Z",
      },
      {
        id: 24,
        title: "전 요즘 이거봐요...",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: "2022-02-03T12:20:54.000Z",
        updatedAt: "2022-02-03T12:20:54.000Z",
      },
      {
        id: 25,
        title: "뻘글입니다. 한번 족적을 남겨보고 싶어서요 ㅎㅎㅎ",
        description:
          "구독한건 없구요 구독 없이도 글쑬수 있더라구요 ",
        list_sub: { list_sub: [] },
        createdAt: "2022-04-05T12:20:54.000Z",
        updatedAt: "2022-04-05T12:20:54.000Z",
      }, {
        id: 26,
        title: "무서운 이야기",
        description:
          "정말 무서운건 뭐나면요.......... 없어요 그런거 그래도 제가 추천하고 싶은게 있어요",
        list_sub: { list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""] },
        createdAt: "2021-02-07T08:10:54.000Z",
        updatedAt: "2021-02-07T08:10:54.000Z",
      }, {
        id: 27,
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
