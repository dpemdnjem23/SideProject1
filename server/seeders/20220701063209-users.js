"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 2,
          username: "dhlEKsrlfdptj12",
          email: "NULL",
          nickname: "나루터",
          password: "rlfrhrlsdugod!@3",
          salt: "sjdhkgkaRprjfdj13113wnfrptmfvma",
          kakao_id: "NULL",
          google_id: "NULL",
          social_user: false,
          isAdmin: false,
        },
        {
          id: 3,
          username: "dhlEKsrlfdptj13",
          email: "NULL",
          nickname: "미소지었다",
          password: "rlfrhrlsdugod!@3",
          salt: "sjdhkgkaRprjfdj13113wnfrptmfvma",
          kakao_id: "NULL",
          google_id: "NULL",
          social_user: false,
          isAdmin: false,
        },
        {
          id: 4,
          username: "dhlEKsrlfdptj14",
          email: "NULL",
          nickname: "demull",
          password: "rlfrhrlsdugod!@3",
          salt: "sjdhkgkaRprjfdj13113wnfrptmfvma",
          kakao_id: "NULL",
          google_id: "NULL",
          social_user: false,
          isAdmin: false,
        },
        {
          id: 5,
          username: "dhlEKsrlfdptj15",
          email: "NULL",
          nickname: "서리리링",
          password: "rlfrhrlsdugod!@3",
          salt: "sjdhkgkaRprjfdj13113wnfrptmfvma",
          kakao_id: "NULL",
          google_id: "NULL",
          social_user: false,
          isAdmin: false,
        },
        {
          id: 6,
          username: "dhlEKsrlfdptj16",
          email: "NULL",
          nickname: "라이언",
          password: "rlfrhrlsdugod!@3",
          salt: "sjdhkgkaRprjfdj13113wnfrptmfvma",
          kakao_id: "NULL",
          google_id: "NULL",
          social_user: false,
          isAdmin: false,
        },
        {
          id: 7,
          username: "dhlEKsrlfdptj17",
          email: "NULL",
          nickname: "브라이언",
          password: "rlfrhrlsdugod!@3",
          salt: "sjdhkgkaRprjfdj13113wnfrptmfvma",
          kakao_id: "NULL",
          google_id: "NULL",
          social_user: false,
          isAdmin: false,
        },
        {
          id: 8,
          username: "dhlEKsrlfdptj18",
          email: "NULL",
          nickname: "홀리몰리",
          password: "rlfrhrlsdugod!@3",
          salt: "sjdhkgkaRprjfdj13113wnfrptmfvma",
          kakao_id: "NULL",
          google_id: "NULL",
          social_user: false,
          isAdmin: false,
        },
        {
          id: 9,
          username: "dhlEKsrlfdptj19",
          email: "NULL",
          nickname: "외딴길에서",
          password: "rlfrhrlsdugod!@3",
          salt: "sjdhkgkaRprjfdj13113wnfrptmfvma",
          kakao_id: "NULL",
          google_id: "NULL",
          social_user: false,
          isAdmin: false,
        },
        {
          id: 10,
          username: "dhlEKsrlfdptj20",
          email: "NULL",
          nickname: "마케이누세",
          password: "rlfrhrlsdugod!@3",
          salt: "sjdhkgkaRprjfdj13113wnfrptmfvma",
          kakao_id: "NULL",
          google_id: "NULL",
          social_user: false,
          isAdmin: false,
        },
        {
          id: 11,
          username: "dhlEKsrlfdptj21",
          email: "NULL",
          nickname: "피치",
          password: "rlfrhrlsdugod!@3",
          salt: "sjdhkgkaRprjfdj13113wnfrptmfvma",
          kakao_id: "NULL",
          google_id: "NULL",
          social_user: false,
          isAdmin: false,
        },
        {
          id: 12,
          username: "dhlEKsrlfdptj22",
          email: "NULL",
          nickname: "sondia",
          password: "rlfrhrlsdugod!@3",
          salt: "sjdhkgkaRprjfdj13113wnfrptmfvma",
          kakao_id: "NULL",
          google_id: "NULL",
          social_user: false,
          isAdmin: false,
        },
        {
          id: 13,
          username: "dhlEKsrlfdptj23",
          email: "NULL",
          nickname: "가로세로",
          password: "rlfrhrlsdugod!@3",
          salt: "sjdhkgkaRprjfdj13113wnfrptmfvma",
          kakao_id: "NULL",
          google_id: "NULL",
          social_user: false,
          isAdmin: false,
        },
        {
          id: 14,
          username: "dhlEKsrlfdptj24",
          email: "NULL",
          nickname: "아침에눈을뜨면",
          password: "rlfrhrlsdugod!@3",
          salt: "sjdhkgkaRprjfdj13113wnfrptmfvma",
          kakao_id: "NULL",
          google_id: "NULL",
          social_user: false,
          isAdmin: false,
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
    await queryInterface.bulkDelete("users", null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
