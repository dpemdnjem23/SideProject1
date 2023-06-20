"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query("SELECT id FROM users;");
    const usersRows = users[0];

    await queryInterface.bulkInsert("shares", [
      {
        id: 22,
        user_id: usersRows[1].id,
        title: "나의 추천 리스트",
        description:
          "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
        list_sub: JSON.stringify({
          list_sub: ["넷플릭스", "현대셀렉션", "쿠팡"],
        }),
        createdAt: new Date(2021, 5, 17, 10, 33, 54),
        updatedAt: new Date(2021, 5, 17, 10, 33, 54),
      },
      {
        id: 23,
        user_id: usersRows[0].id,
        title: "어제 새로 구독 해봤는데요 저는 아직 좋은거같아요",
        description: "이제 추천안해요~ ",
        list_sub: JSON.stringify({ list_sub: ["해피문데이"] }),
        createdAt: new Date(2021, 6, 20, 18, 20, 12),
        updatedAt: new Date(2021, 6, 20, 18, 20, 12),
      },
    //   {
    //     id: 24,
    //     user_id: users[2].id,
    //     title: "전 요즘 이거봐요...",
    //     description:
    //       "제가 어제 말했던 리스트 입니다. 참고해주시기 바랍니다 전 이렇게가 좋더라구요",
    //     list_sub: JSON.stringify({
    //       list_sub: ["넷플릭스", "현대셀렉션", "쿠팡", ""],
    //     }),
    //     createdAt: new Date(2022, 2, 3, 20, 54, 12),
    //     updatedAt: new Date(2022, 2, 3, 20, 54, 12),
    //   },
    //   {
    //     id: 25,
    //     user_id: users[3].id,
    //     title: "뻘글입니다. 한번 족적을 남겨보고 싶어서요 ㅎㅎㅎ",
    //     description: "구독한건 없구요 구독 없이도 글쑬수 있더라구요 ",
    //     list_sub: JSON.stringify({ list_sub: [] }),
    //     createdAt: new Date(2022, 4, 5, 12, 20, 54),
    //     updatedAt: new Date(2022, 4, 5, 12, 20, 54),
    //   },
    //   {
    //     id: 26,
    //     user_id: users[4].id,
    //     title: "무서운 이야기",
    //     description:
    //       "정말 무서운건 뭐나면요.......... 없어요 그런거 그래도 제가 추천하고 싶은게 있어요 이거 근데 사람들이 잘모르는게있는데 구독 그냥하면 비싸잖아요 방법이 있더라구요.. 여기다 쓰긴 어려워요",
    //     list_sub: JSON.stringify({ list_sub: ["유튜브 프리미엄"] }),
    //     createdAt: new Date(2021, 2, 7, 8, 10, 54),
    //     updatedAt: new Date(2021, 2, 7, 8, 10, 54),
    //   },
    //   {
    //     id: 27,
    //     user_id: users[5].id,
    //     title: "영양제 고민해결",
    //     description:
    //       "제가 영양제에 관심이 많은데 사려면 이것저것따질게많아서 여기 구독해서 먹고 있어요 정답은 아니고 살펴보고 맘에드는거 골라보세요~",
    //     list_sub: JSON.stringify({ list_sub: ["필리", "핏타민"] }),
    //     createdAt: new Date(2021, 9, 5, 14, 20, 54),
    //     updatedAt: new Date(2021, 9, 5, 14, 20, 54),
    //   },
    //   {
    //     id: 28,
    //     user_id: users[6].id,
    //     title: "요즘 귀찮아서 애용해요 원랜 안쓰는데..",
    //     description: "ㅈㄱㄴ",
    //     list_sub: JSON.stringify({ list_sub: ["청소연구소", "런드리고"] }),
    //     createdAt: new Date(2021, 9, 5, 20, 18, 54),
    //     updatedAt: new Date(2021, 9, 5, 20, 18, 54),
    //   },
    //   {
    //     id: 29,
    //     user_id: users[7].id,
    //     title: "자취생 강추요~",
    //     description:
    //       "저도 자취하면서 5만원? 정도 쓰고있는데요 매우 유용해요 ~ 좀더 알아보시면 다양한 서비스가 있기는한데 전귀찮아서 걍 기본만써요",
    //     list_sub: JSON.stringify({
    //       list_sub: [
    //         "미하이삭스",
    //         "로켓와우",
    //         "네이버플러스",
    //         "청소연구소",
    //         "클린배딩",
    //       ],
    //     }),
    //     createdAt: new Date(2021, 9, 5, 23, 1, 54),
    //     updatedAt: new Date(2021, 9, 5, 23, 1, 54),
    //   },
    //   {
    //     id: 30,
    //     user_id: users[8].id,
    //     title: "여러분 혹시 고양이 나 개 키우시나요?",
    //     description:
    //       "제가 구독하고있는걸 알려드리려고 하는데요 애가 많이아파서 어떻게 해야하지 하다가 알게 됐어요 여러분들도 생각이 있다면 한번 보시면 될것같아요 저는 A 이용하고있어요 아, 한개는 애견용품인데 그건그냥 다음달에 해지해요",
    //     list_sub: JSON.stringify({ list_sub: ["핏펫박스, 베이컨박스"] }),
    //     createdAt: new Date(2021, 10, 23, 12, 20, 54),
    //     updatedAt: new Date(2021, 10, 23, 12, 20, 54),
    //   },
    //   {
    //     id: 31,
    //     user_id: users[9].id,
    //     title: "여러분들은 어떤 구독쓰세요?",
    //     description:
    //       "제가 현재 이거쓰고있는데 좀 많은거 같기도하고 줄이고 싶은데 추천해주실수 있나요? ",
    //     list_sub: JSON.stringify({
    //       list_sub: ["스마일클럽", "나물투데이", "술담화", "프레시코드"],
    //     }),
    //     createdAt: new Date(2021, 10, 23, 6, 20, 54),
    //     updatedAt: new Date(2021, 10, 23, 6, 20, 54),
    //   },
    //   {
    //     id: 32,
    //     user_id: users[10].id,
    //     title: "배달할땐 이어플이 최고",
    //     description:
    //       "배달의 민족 , 쿠팡이츠 다써봤는데요 여러분들도 써보세요 근데이거 마지막이래요 슈퍼패스? 생긴다던대 혜택 줄어들거같아서 말씀드립니다~",
    //     list_sub: JSON.stringify({ list_sub: ["요기요 슈퍼클럽"] }),
    //     createdAt: new Date(2021, 10, 23, 8, 10, 54),
    //     updatedAt: new Date(2021, 10, 23, 8, 10, 54),
    //   },
    //   {
    //     id: 33,
    //     user_id: users[11].id,
    //     title: "나의 관심사 는 와인이다.",
    //     description:
    //       "제가 유튜브를 보고 와인에대해 공부하면서 관심을 갖게되었는데요 일일이 알아봐가면서 사긴 어려워서 어느정도 도움을 받고자 구독했고 와인에 또 음식이 빠질수 없으니 같이 사용해봤습니다.",
    //     list_sub: JSON.stringify({ list_sub: ["퍼플독", "위허들링"] }),
    //     createdAt: new Date(2021, 10, 23, 18, 10, 54),
    //     updatedAt: new Date(2021, 10, 23, 18, 10, 54),
    //   },
    //   {
    //     id: 34,
    //     user_id: users[5].id,
    //     title: "커피는 커피커피 하면서 울어요 ㅠㅠ",
    //     description:
    //       "커피 알아보고 사기 귀찮아서 이용하네요 한번 사용해보세요 근데 전두개다 사용하진않구요 써본거에요 .. 개인적으로는 원두데일리가 더 다양하고 제취향에 맞는것들이 많더라구요",
    //     list_sub: JSON.stringify({
    //       list_sub: ["넷플릭스", "원두데일리", "빈브라더스"],
    //     }),
    //     createdAt: new Date(2021, 10, 23, 22, 58, 54),
    //     updatedAt: new Date(2021, 10, 23, 22, 58, 54),
    //   },
    //   {
    //     id: 35,
    //     user_id: users[6].id,
    //     title: "이거 강추요~",
    //     description:
    //       "피부때문에 고민이 좀 있었는데요 고민이 싹 없어진건 아니지만 나름 효과가 있더라구요 제가 피부가좀 안좋아서 A,B셋트 시켰는데 저한텐 이게 맞더라구요",
    //     list_sub: JSON.stringify({
    //       list_sub: ["스테디 아리따움", "이마트몰", "톤28"],
    //     }),
    //     createdAt: new Date(2021, 11, 24, 10, 20, 54),
    //     updatedAt: new Date(2021, 11, 24, 10, 20, 54),
    //   },
    //   {
    //     id: 36,
    //     user_id: users[7].id,
    //     title: "아~ 차 싶으면 들어와보세요",
    //     description:
    //       "음식에대한 고민이 있었는데요. 이걸로 해결이 됐어요 근데 좀 비싸서 솔직히 구독으로 추천하기가 좀 그렇네요 월구독료가 10만원쯤해요 이게 다른 구독 시스템과는 달리 좀화끈해요 ㅎㅎ;",
    //     list_sub: JSON.stringify({ list_sub: ["아일랜드박스"] }),
    //     createdAt: new Date(2021, 11, 26, 18, 10, 54),
    //     updatedAt: new Date(2021, 11, 26, 18, 10, 54),
    //   },
    //   {
    //     id: 37,
    //     user_id: users[8].id,
    //     title: "여러분들 여러분들 고민 없으신가요?",
    //     description:
    //       "제가 빵을 좋아하는데, 최근에 동물 유튜브를 보고 눈물을 흘렸어요 그래서 빵을 못먹겠더라구요 그런데, 좋은 상품이 있어서 구독하고 있어요 여러분들도 비슷하다면 한번 이용해보세요",
    //     list_sub: JSON.stringify({
    //       list_sub: [
    //         "더브레드블루",
    //         "다다일상",
    //         "나물투데이",
    //         "넷플릭스",
    //         "쿠팡",
    //         "해피문데이",
    //       ],
    //     }),
    //     createdAt: new Date(2021, 11, 26, 5, 12, 54),
    //     updatedAt: new Date(2021, 11, 26, 5, 12, 54),
    //   },
    //   {
    //     id: 38,
    //     user_id: [9].id,
    //     title: "아무말 챌린지 아세요?",
    //     description:
    //       "제가 만든거에요 ~ 다른사람들이 좋은글 많이 써주셔서 전 뻘글 남겨봅니다. 구독은 하는데 등록하기가 귀찮아서; 나중에 사용할일 있으면 같이 남겨봅니다",
    //     list_sub: JSON.stringify({ list_sub: [] }),
    //     createdAt: new Date(2021, 12, 8, 12, 58, 54),
    //     updatedAt: new Date(2021, 12, 8, 12, 58, 54),
    //   },
    //   {
    //     id: 39,
    //     user_id: users[12].id,
    //     title: "안녕하세요",
    //     description:
    //       "요즘제가 구독한것들인데요 다들 알것같기는한데.. 혹시 몰라서요 이조합 괜찮아요 4만원정도면되구요 한개 더 구독할까 생각중이에요~ 큰일났어요 너무 재밌어요 ",
    //     list_sub: JSON.stringify({
    //       list_sub: ["넷플릭스", "웨이브", "라프텔", "티빙"],
    //     }),
    //     createdAt: new Date(2021, 8, 23, 18, 22, 54),
    //     updatedAt: new Date(2021, 8, 23, 18, 22, 54),
    //   },
    //   {
    //     id: 40,
    //     user_id: users[13].id,
    //     title: "구독이 정말 많아진거 같아요",
    //     description:
    //       "맘에드는거 한개씩 한개씩 등록하다보니까 저도모르게 엄청 구독했더라구요. 시청하는 서비스들은 많이구독해도 티가안나는데 제품 구독은 이게 너무많이오네요 ㅠㅠ",
    //     list_sub: JSON.stringify({
    //       list_sub: [
    //         "스마일클럽",
    //         "로켓와우",
    //         "그리팅",
    //         "맘마레시피",
    //         "잇츠온",
    //         "오설록",
    //       ],
    //     }),
    //     createdAt: new Date(2021, 6, 1, 10, 1, 54),
    //     updatedAt: new Date(2021, 6, 1, 10, 1, 54),
    //   },
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
