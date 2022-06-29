require("dotenv").config();

const crypto = require("crypto");
const { authchecker } = require("../middleware/authChecker");
// const { exit } = require("process");

const { user } = require("../models");

const {
  generateAccessToken,
  generateRefreshToken,
  sendCookie,
  checkRefreshToken,
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
          const userInfo = await user.findOne({
            where: { username: username, password: hardPassword },
          });
          console.log(userInfo);

          if (!userInfo) {
            return res.status(401).send("이메일 및 비밀번호 확인");
          }
          const userUsername = userInfo.dataValues.username;
          const userNick = userInfo.dataValues.nickname;
          const userId = userInfo.dataValues.id;
          // const { email, nickname, id } = userInfo.dataValues;
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

          console.log(accessToken);

          //referesh는 쿠키로, access는 활용할수 있도록 client로 보낸다.
          sendCookie(res, refreshToken);

          return res
            .status(200)
            .send({
              data:{
              id: userId,
              nickname: userNick,
              username: userUsername,
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
    const accessTokenData = req.user

    console.log(req.use)

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

  kakaoControl: async (req, res) => {},
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


    //서버는 accesstoken이 만료됨을 확인했어 => 권한이 없음을 나타내야함
    // 서버는 받은 accesstoken 조작되지 않음을 확인하고, 
    

    const refreshToken = req.cookies.refreshToken

    console.log(refreshToken)

    const refreshTokenData = checkRefreshToken(refreshToken)

    if(!refreshTokenData){
      return res.status(401).send({message: "유효하지 않은 토큰~"});
    }




  },
};
