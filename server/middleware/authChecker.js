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

    const refreshToken = req.cookies.refreshToken;
    const authorization =
      req.headers["Authorization"] || req.headers["authorization"];

    //accesstoken이 존재하지 않는경우 넘어간다. 로그인이 되지 않은경우
    const isPublic = (url) => {

      // TODO: 로그인하지 않아도 이용 가능한 기능의 URL을 정의합니다.
      return url.startsWith("/share") ||url.startsWith("/login")||url.startsWith("/signup")
    };

    if (authorization) {
      //토큰이 없으면 넘어간다 -> 로그인 되지 않은경우
      //토큰이 없는경우 다음 미들웨어로 ->

      if (isPublic(req.url)) {
        console.log('토큰이 필요없어')
        return next();
      }
      console.log('토큰이 필요한곳이야 나가')

      return res.status(401).send("Unauthorized");
    }

    // console.log("enqjs");

    try {
      console.log('통과되었다.')

      const accessToken = authorization.split(" ")[1];

      //토큰이 존재하는경우 -> 로그인 하는경우 반드시 액세스, 리프레쉬 발급
      const accessTokendata = checkAccessToken(accessToken);

      //리프레쉬토큰이 만료되었다는것은, 만료기간이 다된경우와,진짜로 조작된경우 2가지
      // 만료가된경우와 조작이돼서 만료된경우 두가지를 골라야겟지

      //시간이 다돼서 만료되었다 라는의미
      //만약 리프레쉬 토큰이 만료가 된경우 로그아웃 필요
      //리프레쉬 토큰이 만료가 됐으며 어떻게 로그아웃을할까?

      if (!accessTokendata) {
        return res.status(403).send("토큰이 만료되었습니다.");
      }

      // return data
      req.access = accessToken;
      req.user = accessTokendata;
      req.refresh = refreshToken;
      req.issue = refreshTokenData;
    } catch (err) {
      //accessToken이 만료되거나 검증에 실패한 경우 -> refreshToken으로 재발급 한다.

      const refreshTokenData = checkRefreshToken(refreshToken);

      return res.status(501).send(err);
    }
    next();

    // return res.status(200).send({data:data})
  },
};
