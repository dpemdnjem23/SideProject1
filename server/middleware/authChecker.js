require("dotenv").config();
const router = require("express").Router();
const { access } = require("fs");
const { verify } = require("jsonwebtoken");
const { checkAccessToken, checkRefreshToken } = require("../utils/jwt");
module.exports = {
  authchecker: (req, res, next) => {
    //auth가 만료 됐다면 로그인이 해제되어야한다.

    //auth 는 2가지 케이스가 존재한다

    // 1. 아직 auth가 발급되지 않은경우(로그인x,로그아웃 된상황)

    //2. auth가 만료된 경우 ( 리프레쉬로 재발급, 로그인상황 에서 시간이다된경우)

    const refreshToken = req.cookies.refreshToken;

    const authorization =
      req.headers["Authorization"] || req.headers["authorization"];
    console.log(authorization);

    //accesstoken이 존재하지 않는경우 넘어간다.
    if (!authorization) {
      return next();
    }

    try {
      const accessToken = authorization.split(" ")[1];
      //만료된 혹은 변경된 경우(기존과 달라짐) accesstoken은 null값으로 잡힌다.
      const accessTokendata = checkAccessToken(accessToken);
      const refreshTokenData = checkRefreshToken(refreshToken);
      console.log(accessTokendata, "checkAccess");
      console.log(refreshTokenData,'checkRefresh')

      //accessToken이 만료됐거나 변경된경우
      //accessTokne 만료가 됏는데 refresh가 아직 살아있으면 재발급 여지존재

      //그러면 next()
      if (!accessTokendata&&!refreshTokenData) {

        return res.status(401).send("토큰이 만료되었습니다.");
      }
      // return data
      req.access=accessToken
      req.user = accessTokendata;
    } catch (err) {
      res.status(501);
      throw err;
    }

    return next();
    // return res.status(200).send({data:data})
  },
};
