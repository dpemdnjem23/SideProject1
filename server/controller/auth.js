require("dotenv").config();

const axios = require("axios");
const crypto = require("crypto");

const { user } = require("../models");
const qs = require('qs');

const {
  generateAccessToken,
  generateRefreshToken,
  sendCookie,
  checkRefreshToken,
  tokenExp,
} = require("../utils/jwt");

module.exports = {
  signupControl: async (req, res) => {
    try {
      const { username, nickname, password } = req.body;
      // console.log(await models.user.create({email:email}))

      const existUser = await user.findOne({ where: { username } });
      //가입되지 않은 경우 가입한다.

      if (existUser) {
        return res.status(401).send("이미 가입된 아이디입니다.");
      } else {
        crypto.randomBytes(64, (err, buf) => {
          if (err) {
            throw err;
          } else {
            const salt = buf.toString("base64");
            crypto.pbkdf2(
              password,
              salt,
              11011,
              64,
              "sha512",
              async (err, key) => {
                if (err) {
                  throw err;
                } else {
                  const hardPassword = key.toString("base64");
                  const insertUser = await user.create({
                    username: username,
                    nickname: nickname,
                    password: hardPassword,
                    salt: salt,
                  });
                  if (!insertUser) {
                    return res.status(400).send("가입실패");
                  } else {
                    return res.status(201).send("가입 성공");
                  }
                }
              }
            );
          }
        });
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  signinControl: async (req, res) => {
    // const body = JSON.stringify(req.body)

    const { username, password } = req.body;

    try {
      // console.log(username,password)


res.status(200).send(req.body)

      const salt = await user.findOne({
        attributes: ["salt"],
        where: { username },
      });

      if (!salt) {
        return res.status(401).send("유저를 찾을수 없다.");
      }

      //2. 유저 db에서 이메일 확인하기

      crypto.pbkdf2(
        password,
        salt.dataValues.salt,
        11011,
        64,
        "sha512",
        async (err, key) => {
          if (err) {
            throw err;
          }
          const hardPassword = key.toString("base64");

          // console.log(hardPassword)
          const getUserInfo = await user.findOne({
            where: { username: username, password: hardPassword },
          });

          if (!getUserInfo) {
            return res.status(401).send("이메일 및 비밀번호 확인");
          }
          const userUsername = getUserInfo.dataValues.username;
          const userNick = getUserInfo.dataValues.nickname;
          const userId = getUserInfo.dataValues.id;
          const isSocial = getUserInfo.dataValues.social_user;
          const isAdmin = getUserInfo.dataValues.isAdmin;
          // const { email, nickname, id } = getUserInfo.dataValues;

          const accessToken = generateAccessToken({
            userUsername,
            userNick,
            userId,
            isAdmin,
            isSocial,
          });
          const refreshToken = generateRefreshToken({
            userUsername,
            userNick,
            userId,
            isAdmin,
            isSocial,
          });

          const accessExp = tokenExp(accessToken);
          const refreshExp = tokenExp(refreshToken);

          // console.log(accessToken)

          //referesh는 쿠키로, access는 활용할수 있도록 client로 보낸다.
          sendCookie(res, refreshToken);

          // console.log(req.exp, req.user, "req.exp");

          return res.status(200).send({
            data: {
              id: userId,
              nickname: userNick,
              username: userUsername,
              social_user: false,
              isAdmin: false,
              accessExp: accessExp,
              refreshExp: refreshExp,
            },
            access: accessToken,
          });

          // 토큰 생성 한다. 구글, 카카오 인경우도 있으므로 id이용
        }
      );
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  signoutControl: async (req, res) => {
    // console.log(req.user);
    // console.log(req.headers)
    //signout 시 토큰이 만료가 됐다.

    // const token = req.access;

    // console.log(req.use)

    try {
      //로그아웃을할때 ,
      console.log("난 로그아웃");
      // const accessTokenData = req.user;

      // await axios.get("https://kapi.kakao.com/v1/user/logout", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      return res.clearCookie("refreshToken").status(200).send("로그아웃 완료");
    } catch (err) {
      return res.status(500).send("로그아웃 서버오류");
    }
    //로그 아웃은 토큰을 제거해준다.
    // authchecker(req,res,next)
    // console.log(req.body)
  },
  //닉네임 체크

  nickcheckControl: async (req, res) => {
    //닉이 존재하지 않아야 한다.
    const { nickname } = req.body;

    try {
      const existNick = await user.findOne({ where: { nickname } });

      if (!existNick) {
        return res.status(200).send("닉네임 사용가능");
      }

      return res.status(400).send("닉네임 사용불가");
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  googleControl: async (req, res) => {
    const { code } = req.body;

    console.log(req.body);

    try {
      const getAccessToken = await axios.post(
        `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT}&client_secret=${process.env.GOOGLE_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      const Token = getAccessToken.data.access_token;
      console.log(getAccessToken.data);
      // https://www.googleapis.com/oauth2/v2/userinfo?access_token=${Token}
      // https://www.googleapis.com/oauth2/v3/tokeninfo
      const getUserInfo = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${Token}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      // console.log(getUserInfo)
      const googleNickname = new Array(
        "뭉차이",
        "더더덜",
        "슈슈슉",
        "쑤욱쑥",
        "키요틴",
        "날라리",
        "수구링",
        "멍텅구",
        "울하비",
        "차차아",
        "뽀로로",
        "어피치",
        "초롱초롱",
        "튜브",
        "프로도",
        "라이언",
        "프로도"
      );
      function randomItem(a) {
        return a[Math.floor(Math.random() * a.length)];
      }

      const google_id = getUserInfo.data.id;
      const email = getUserInfo.data.email;

      const googleUser = await user.findOne({
        where: { google_id: google_id },
      });

      // 신규 가입자 인경우
      //아이디만 만든다.만들엇으면
      // console.log(googleUser);
      // console.log(googleUser===null)

      if (!googleUser) {
        const newUser = await user.create({
          google_id: google_id,
          nickname: randomItem(googleNickname),
          email: email,
          social_user: true,
          isAdmin: false,
        });

        const accessToken = generateAccessToken(newUser.dataValues);

        const refreshToken = generateRefreshToken(newUser.dataValues);

        const accessExp = tokenExp(accessToken);
        const refreshExp = tokenExp(refreshToken);

        sendCookie(res, refreshToken);

        return res.status(200).send({
          data: {
            id: newUser.id,
            accessExp: accessExp,
            refreshExp: refreshExp,
            google_id: google_id,
            nickname: newUser.nickname,
            social_user: true,
            isAdmin: false,
          },
          accessToken: accessToken,
        });
      }
      //이미 가입한 경우
      const accessToken = generateAccessToken(googleUser.dataValues);
      const refreshToken = generateRefreshToken(googleUser.dataValues);
      const accessExp = tokenExp(accessToken);

      const refreshExp = tokenExp(refreshToken);
      sendCookie(res, refreshToken);
      return res.status(200).send({
        data: {
          id: googleUser.dataValues.id,
          accessExp: accessExp,
          refreshExp: refreshExp,
          google_id: google_id,
          nickname: googleUser.nickname,
          social_user: true,
        },
        accessToken: accessToken,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  kakaoControl: async (req, res) => {
    const { code } = req.body;

    if (!code) {
      return res.status(400).send("Bad request");
    }

    try {
      // client_secret=${process.env.KAKAO_SECRET}&

      const getAccessToken = await axios.post(
        `https://kauth.kakao.com/oauth/token?code=${code}&client_id=${process.env.KAKAO_CLIENT}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&grant_type=authorization_code`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      // console.log(result.data)

      const Token = getAccessToken.data.access_token;

      const getUserInfo = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });

      // console.log(getUserInfo)
      //로그인을하면 kakao 유저정보를 가ㅕ와서 client에 뿌려줄껀데 refresh와 accesstoken 발급받아서
      // 만약 다되면 로그아웃이 되도록

      const kakao_id = getUserInfo.data.id;
      const email = getUserInfo.data.kakao_account.email;
      const nickname = getUserInfo.data.properties.nickname;

      // console.log(nickname);

      const kakaoUser = await user.findOne({ where: { kakao_id: kakao_id } });
      // 신규 가입자 인경우
      //아이디만 만든다.만들엇으면
      if (!kakaoUser) {
        const newUser = await user.create({
          id: kakaoUser.dataValues.id,
          kakao_id: kakao_id,
          nickname: nickname,
          email: email,
          social_user: true,
        });

        const accessToken = generateAccessToken(newUser.dataValues);

        const refreshToken = generateRefreshToken(newUser.dataValues);

        const accessExp = tokenExp(accessToken);
        const refreshExp = tokenExp(refreshToken);

        sendCookie(res, refreshToken);

        return res.status(200).send({
          data: {
            id: newUser.id,
            accessExp: accessExp,
            refreshExp: refreshExp,
            kakao_id: kakao_id,
            nickname: nickname,
            social_user: true,
          },
          accessToken: accessToken,
        });
      }
      //이미 가입한 경우
      const accessToken = generateAccessToken(kakaoUser.dataValues);
      const refreshToken = generateRefreshToken(kakaoUser.dataValues);
      const accessExp = tokenExp(accessToken);

      const refreshExp = tokenExp(refreshToken);
      sendCookie(res, refreshToken);
      return res.status(200).send({
        data: {
          id: kakaoUser.dataValues.id,
          accessExp: accessExp,
          refreshExp: refreshExp,
          kakao_id: kakao_id,
          nickname: nickname,
          social_user: true,
        },
        accessToken: accessToken,
      });
    } catch (err) {
      return res.status(500).send({ err: err });
    }
  },
  usernameCheckControl: async (req, res) => {
    const { username } = req.body;
    try {
      const existUsername = await user.findOne({ where: { username } });

      console.log(existUsername);
      if (!existUsername) {
        return res.status(200).send("아이디 사용가능");
      }

      return res.status(400).send("아이디 사용불가");
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  accessTokenReissueControl: async (req, res) => {
    console.log("getUserIssuee issue가 넘어왔어");

    //accessToken이 만료가된경우 -> !accessToken,
    try {
      const refreshToken = req.cookies.refreshToken;

      //리프레쉬토큰으로 재발급을한다 -> 리프레쉬토큰이 만약에 존재하지않으면
      //로그아웃을 진행해야하기때문에 따로뺀다.
      const refreshTokenData = checkRefreshToken(refreshToken);

      if (!refreshTokenData) {
        console.log("refreshoToken", refreshTokenData, refreshToken);

        return res.status(401).send("token expired");
      }
      //로컬 스토리지에있던 accesstoken의 정보를 db랑 비교
      //만약 다르다면 정보가 변경때문에 로그아웃
      const getUserInfo = await user.findOne({
        where: {
          id: refreshTokenData.userId,
        },
      });
      if (!getUserInfo) {
        return res.status(400).send("존재하지않는 회원입니다.");
      }

      // id: 1,
      // username: 'xptmxm123',
      // nickname: '테스트 아이디',
      // salt: 'C7H69/xwsfq45ePqQnbHg7UlaqV6BzuU1fHbtowt8ZMMosPR/6EOVWBomOq/aofc76lPiOtqnh0GeR8mLzlztg==',
      // kakao_id: null,
      // google_id: null,
      // social_user: false,
      // isAdmin: false,
      // email: null,

      const {
        username,
        email,
        nickname,
        id,
        kakao_id,
        google_id,
        social_user,
        isAdmin,
      } = getUserInfo.dataValues;
      //카카오 로그인
      if (kakao_id) {
        const accessToken = generateAccessToken({
          kakao_id,
          nickname,

          social_user,
          isAdmin,
        });
        const accessExp = tokenExp(accessToken);

        return res.status(200).send({
          data: {
            id: id,
            kakao_id: kakao_id,
            nickname: nickname,

            social_user: social_user,
            isAdmin: isAdmin,
            accessExp: accessExp,
          },
          accessToken: accessToken,
        });
      } else if (google_id) {
        const accessToken = generateAccessToken({
          id,
          nickname,
          google_id,

          email,
          social_user,
          isAdmin,
        });
        const accessExp = tokenExp(accessToken);

        return res.status(200).send({
          data: {
            id: id,
            google_id: google_id,
            email: email,
            nickname: nickname,
            social_user: social_user,
            isAdmin: isAdmin,
            accessExp: accessExp,
          },
          accessToken: accessToken,
        });
      } else {
        const accessToken = generateAccessToken({
          id,
          username,
          nickname,
          social_user,
          isAdmin,
        });
        const accessExp = tokenExp(accessToken);

        console.log("재발급에 성공했습니다. 다음으로 넘어가세요");

        return res.status(200).send({
          data: {
            id: id,
            username: username,
            nickname: nickname,
            social_user: social_user,
            isAdmin: isAdmin,

            accessExp: accessExp,
          },
          accessToken: accessToken,
        });
      }

      //구글 로그인
    } catch (err) {
      res.status(500);
      throw err;
    }
  },

  passwordCheck: async (req, res) => {
    //비밀번호가 기존의 비밀번호와 맞는지 확인한다.

    const { password } = req.body;

    try {
      const salt = await user.findOne({
        attributes: ["salt"],
        where: { username: req.user.userUsername },
      });

      if (!salt) {
        return res.status(401).send("유저를 찾을수 없다.");
      }

      console.log(salt);

      //2. 유저 db에서 이메일 확인하기

      crypto.pbkdf2(
        password,
        salt.dataValues.salt,
        11011,
        64,
        "sha512",
        async (err, key) => {
          if (err) {
            throw err;
          }
          const hardPassword = key.toString("base64");

          const checkPassword = await user.findOne({
            where: { password: hardPassword },
          });
          if (!checkPassword) {
            return res.status(400).send("비밀번호가 일치하지 않습니다.");
          }

          return res.status(200).send("적합한 비밀번호 입니다.");
        }
      );
    } catch (err) {
      return res.status(500).send("서버에러");
    }
  },
};
