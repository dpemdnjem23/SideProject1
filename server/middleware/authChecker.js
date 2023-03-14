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
  authchecker: async (req, res, next) => {
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
        url.startsWith("/auth/signup") ||
        url.startsWith("/callendar")
      );
    };

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


       console.log(accessTokenData)
//       if(!accessTokendata){
// return res.status(401).semd('token expired')
//       }

      //리프레쉬토큰으로 재발급을한다 -> 리프레쉬토큰이 만약에 존재하지않으면
      //로그아웃을 진행해야하기때문에 따로뺀다.

      // console.log(userOne)
      req.access = accessToken;
      req.user = accessTokendata

      return next();
    } catch (error) {
      //accessToken이 만료되거나 검증에 실패한 경우 -> refreshToken으로 재발급 한다.

      return res.status(501).send(error);
    }
  },

  // return res.status(200).send({data:data})
};
