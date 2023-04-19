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
    const authorization =
      req.headers["Authorization"] || req.headers["authorization"];

      
    // const refreshToken = req.cookies.req.refreshToken;
//refreshoToken이 만약에 죽게된다면 undefined

    // const accessToken = authorization.split(" ")[1];

    //accesstoken이 존재하지 않는경우 넘어간다. 로그인이 되지 않은경우
    const isPublic = (url) => {
      // 로그인하지 않아도 이용 가능한 기능의 URL을 정의합니다.
      return (
        url.startsWith("/share") ||
        url.startsWith("/auth/signin") ||
        url.startsWith("/auth/signup") ||
        url.startsWith("/callendar") ||
        url.startsWith("/auth/google") ||
        url.startsWith("/auth/kakao")||
        url.startsWith("/auth/signout")

      );
    };

    if (!authorization) {
      //토큰이 없는경우 허용되지 않는다. 단,예외
      if (isPublic(req.url)) {
        console.log('해당되지 않는 건 이리와')
        //share login signup callendar는 토큰이 없어도 진입가능

        return next();
      }

      return res.status(401).send("Unauthorized");
    }

    try {
      const accessToken = authorization.split(" ")[1];
      //토큰이 존재하는경우 -> 로그인 하는경우 반드시 액세스, 리프레쉬 발급
      const accessTokendata = checkAccessToken(accessToken);

      //acceesTokendata -> null이야 그러면 reissueaccessToken

      // if (accessTokendata === null) {
      //   console.log('여기야 여기')
      //   return res.status(401).send("Unauthorized");
      // }

      //       if(!accessTokendata){
      // return res.status(401).semd('token expired')
      //       }

      //리프레쉬토큰으로 재발급을한다 -> 리프레쉬토큰이 만약에 존재하지않으면
      //로그아웃을 진행해야하기때문에 따로뺀다.

      // console.log(userOne)
      req.access = accessToken;
      req.user = accessTokendata;

      return next();
    } catch (error) {
      //accessToken이 만료되거나 검증에 실패한 경우 -> refreshToken으로 재발급 한다.

      return res.status(501).send(error);
    }
  },

  // return res.status(200).send({data:data})
};

// module.exports = router
