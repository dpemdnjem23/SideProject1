require("dotenv").config();

const router = require("express").Router();
const controller = require("../controller/auth");
const { accessTokenReissueControl } = require("../controller/auth");
const { checkAccessToken, checkRefreshToken } = require("../utils/jwt");
module.exports = {
  authchecker: (req, res, next) => {
    //auth가 만료 됐다면 로그인이 해제되어야한다.

    //auth 는 2가지 케이스가 존재한다

    // 1. 아직 auth가 발급되지 않은경우(로그인x,로그아웃 된상황)

    //2. auth가 만료된 경우 ( 리프레쉬로 재발급, 로그인상황 에서 시간이다된경우)

    const refreshToken = req.cookies.refreshToken;

    console.log("처음 접속");

    const authorization =
      req.headers["Authorization"] || req.headers["authorization"];
    //accesstoken이 존재하지 않는경우 넘어간다. 로그인이 되지 않은경우

    if (!authorization || !refreshToken) {
      return next();
    }

    try {
      const accessToken = authorization.split(" ")[1];
      //만료된 혹은 변경된 경우(기존과 달라짐) accesstoken은 null값으로 잡힌다.
      const accessTokendata = checkAccessToken(accessToken);
      const refreshTokenData = checkRefreshToken(refreshToken);

      //accessToken이 만료됐거나 변경된경우
      //accessTokne 만료가 됏는데 refresh가 아직 살아있으면 재발급 여지존재

      //그러면 next()

      //매버 currentTime을 체크한다.
      const currentTime = Math.floor(Date.now() / 1000);

      const accessExp = tokenExp(accessToken);

      // accessExp 즉,만료되었다는 얘기다 만료가 된경우 재발급하여야 한다.
      if (accessExp < currentTime) {
        console.log("재발급 하고싶어요");
        router.post("/issueaccess", controller.accessTokenReissueControl);
      }

      if (!accessTokendata || !refreshTokenData) {
        return res.status(401).send("토큰이 만료되었습니다.");
      }
      // return data
      req.access = accessToken;
      req.user = accessTokendata;
    } catch (err) {
      return res.status(501).send(err);
    }

    return next();
    // return res.status(200).send({data:data})
  },
};
