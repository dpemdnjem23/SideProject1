require("dotenv").config();

const { user } = require("../models");

const router = require("express").Router();
const controller = require("../controller/auth");
const {
  checkAccessToken,
  checkRefreshToken,
  tokenExp,
} = require("../utils/jwt");
module.exports = {
  authchecker: (req, res, next) => {
    //auth가 만료 됐다면 로그인이 해제되어야한다.

    //auth 는 2가지 케이스가 존재한다

    //로그인 했다면 refresh access 둘다 발급된다.
    //로그인되지 않은 상태면 그냥 넘어간다.
    // 로그인 된경우 2가지 acess, refresh
    //access가 만료된경우와 refresh가 만료된경우 2가지가 존재한다.
    //access가 만료된경우 refresh로 재발급해야한다.
    //refresh가 만료된경우 refresh는 로그아웃을 해야한다.

    const authorization =
      req.headers["Authorization"] || req.headers["authorization"];

    // const accessToken = authorization.split(" ")[1];

    //accesstoken이 존재하지 않는경우 넘어간다. 로그인이 되지 않은경우
    const isPublic = (url) => {
      // 로그인하지 않아도 이용 가능한 기능의 URL을 정의합니다.
      return (
        url.startsWith("/share") ||
        url.startsWith("/auth/signin") ||
        url.startsWith("auth/signup") ||
        url.startsWith("/callendar")
      );
    };
    console.log(!authorization);

    if (!authorization) {
      //토큰이 없는경우 허용되지 않는다. 단,예외
      if (isPublic(req.url)) {
        //share login signup callendar는 토큰이 없어도 진입가능
        console.log("준비");

        return next();
      }

      return res.status(401).send("Unauthorized");
    }

    try {
      const accessToken = authorization.split(" ")[1];
      //토큰이 존재하는경우 -> 로그인 하는경우 반드시 액세스, 리프레쉬 발급
      const accessTokendata = checkAccessToken(accessToken);

      //accessToken만료 -> refreshtoken으로 재발급
      user.findOne({ where: { id: accessTokendata.id } });

      // console.log(userOne)
      req.access = accessToken;
      req.user = accessTokendata;

      return next();
    } catch (error) {
      //accessToken이 만료되거나 검증에 실패한 경우 -> refreshToken으로 재발급 한다.
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return next();
      }

      try {
        //리프레쉬토큰으로 재발급을한다 -> 리프레쉬토큰이 만약에 존재하지않으면
        //로그아웃을 진행해야하기때문에 따로뺀다.
        const refreshTokenData = checkRefreshToken(refreshToken);

        const currentTime = Math.floor(Date.now() / 1000);

        const accessExp = tokenExp(req.access);

        // if(accessExp<currentTime)
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
          const refreshExp = tokenExp(req.refresh);

          return res.status(200).send({
            data: {
              id: id,
              kakao_id: kakao_id,
              nickname: nickname,

              social_user: social_user,
              isAdmin: isAdmin,
              accessExp: accessExp,
              refreshExp: refreshExp,
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
          const refreshExp = tokenExp(req.refresh);

          return res.status(200).send({
            data: {
              id: id,
              google_id: google_id,
              email: email,
              nickname: nickname,
              social_user: social_user,
              isAdmin: isAdmin,
              accessExp: accessExp,
              refreshExp: refreshExp,
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
          const refreshExp = tokenExp(req.refresh);

          return res.status(200).send({
            data: {
              id: id,
              username: username,
              nickname: nickname,
              social_user: social_user,
              isAdmin: isAdmin,

              accessExp: accessExp,
              refreshExp: refreshExp,
            },
            accessToken: accessToken,
          });
        }
      } catch (err) {
        return res.status(501).send(error);
      }
    }
  },

  // return res.status(200).send({data:data})

  refreshTokenMiddleware: (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    //refreshToken이 없으면 그냥 넘어간다
    if (!refreshToken) {
      return next();
    }

    try {
      //refreshToken이 존재하고 만료가되지 않았다면, accessToken 을 재발급
      const refreshTokenData = checkRefreshToken(refreshToken);

      //리프레쉬 토큰이 만료가 됐으면 로그아웃을 해야한다.
      if (!refreshTokenData) {
        return res.status(401).send("리프레쉬 토큰이 존재하지 않는경우");
      }
    } catch (err) {
      return res.status(501).send(err);
    }
  },
};
