require("dotenv").config();

const { default: axios } = require("axios");
const crypto = require("crypto");
const { authchecker } = require("../middleware/authChecker");
// const { exit } = require("process");

const { user } = require("../models");

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
    try {
      const { username, password } = req.body;

      const salt = await user.findOne({
        attributes: ["salt"],
        where: { username },
      });

      console.log(salt.dataValues.salt);
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
          console.log(getUserInfo);

          if (!getUserInfo) {
            return res.status(401).send("이메일 및 비밀번호 확인");
          }
          const userUsername = getUserInfo.dataValues.username;
          const userNick = getUserInfo.dataValues.nickname;
          const userId = getUserInfo.dataValues.id;
          // const { email, nickname, id } = getUserInfo.dataValues;
          const accessToken = generateAccessToken({
            userUsername,
            userNick,
            userId,
          });
          const refreshToken = generateRefreshToken({
            userUsername,
            userNick,
            userId,
          });
          const accessExp = tokenExp(accessToken);
          const refreshExp = tokenExp(refreshToken);

          //referesh는 쿠키로, access는 활용할수 있도록 client로 보낸다.
          sendCookie(res, refreshToken);

          // console.log(req.exp, req.user, "req.exp");

          return res.status(200).send({
            data: {
              id: userId,
              nickname: userNick,
              username: userUsername,
              accessExp: accessExp,
              refreshExp: refreshExp,
            },
            accessToken: accessToken,
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
    const accessTokenData = req.user;

    // console.log(req.use)

    try {
      if (!accessTokenData) {
        return res.status(401).send("토큰이 존재하지 않습니다.");
      }

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

    const existNick = await user.findOne({ where: { nickname } });

    if (!existNick) {
      return res.status(200).send("닉네임 사용가능");
    }

    return res.status(400).send("닉네임 사용불가");
  },

  googleControl: async (req, res) => {},

  kakaoControl: async (req, res) => {

    
    const { code } = req.body;

    if (!code) {
      return res.status(400).send("Bad request");
    }
    


    try {
      // client_secret=${process.env.KAKAO_SECRET}&
      console.log(code)

      const getAccessToken = await axios.post(
        `https://kauth.kakao.com/oauth/token?code=${code}&client_id=${process.env.KAKAO_CLIENT}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&grant_type=authorization_code`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            Accept: "application/json",
          },
        }


      );
      // console.log(result.data)

      const accessToken =getAccessToken.data.access_token
      const refrshToken = getAccessToken.data.refresh_token
      const accessExp = getAccessToken.data.expires_in
      const refreshExp = getAccessToken.data.refresh_token_expires_in
      
      const getUserInfo = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${getAccessToken.data.access_token}`,
        },
      });
console.log(getUserInfo)


const email = getUserInfo.kakao_account.email
const nickname = getUserInfo.kakao_account.profile.nickname

console.log(nickname)






    } catch (err) {
  
      return res.status(500).send({err:err});
    }
  },
  usernameCheckControl: async (req, res) => {
    try {
      const { username } = req.body;
      console.log(username);

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

  accessTokenReissuaControl: async (req, res) => {
    //만료시간이 다가오면 작동됨
    //1. 액세스토큰이 만료되기전에 리프레쉬로 액세스토큰을 재발행 한다.
    //2.  리프레쉬가 만료가됐는지를 확인해야함
    //2-1 => 리프레쉬가 만료가됐는지 or 리프레쉬 토큰에 조작이 있었는지

    //조작을 확인하는 방법은 decode해서 비교를 해야하고, 토큰 만료는 토큰이
    //있는지 없는지만 확인한다.
    // 액세스 재발급 -> 로컬스토리지에 있는 정보를 가져와서 db랑 비교
    // 로컬스토리지는 id, nickname,username 3개를 가져온다.

    const { username, nickname, id } = req.body;

    const refreshToken = req.cookies.refreshToken;

    console.log(refreshToken);

    // 리프레쉬 토큰이 만료된경우 => 로그아웃을 해야함.

    if (!refreshToken) {
      return res.status(401).send("토큰이 없어");
    }

    try {
      const refreshTokenData = checkRefreshToken(refreshToken);

      if (!refreshTokenData) {
        return res.status(401).send("리프레쉬 토큰이 만료되었습니다.");
      }

      //로컬 스토리지에있던 accesstoken의 정보를 db랑 비교
      //만약 다르다면 정보가 변경때문에 로그아웃
      const getUserInfo = await user.findOne({
        where: { username: username, nickname: nickname, id: id },
      });
      if (!getUserInfo) {
        return res.status(401).send("토큰 정보가 일치하지 않습니다.");
      }
      const userUsername = getUserInfo.dataValues.username;
      const userNick = getUserInfo.dataValues.nickname;
      const userId = getUserInfo.dataValues.id;
      // const { email, nickname, id } = getUserInfo.dataValues;
      const accessToken = generateAccessToken({
        userUsername,
        userNick,
        userId,
      });
      const accessExp = tokenExp(accessToken);
      const refreshExp = tokenExp(refreshToken);

      return res.status(200).send({
        data: {
          id: userId,
          nickname: userNick,
          username: userUsername,
          accessExp: accessExp,
          refreshExp: refreshExp,
        },
        accessToken: accessToken,
      });
    } catch (err) {
      res.status(500);
      throw err;
    }
  },
};
