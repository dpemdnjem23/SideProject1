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

    if (!authorization || !refreshToken) {
      //토큰이 없으면 넘어간다 -> 로그인 되지 않은경우
      return next();
    }
    // console.log("enqjs");

    try {
      //토큰이 존재하는경우 -> 로그인 하는경우 반드시 액세스, 리프레쉬 발급
      const accessToken = authorization.split(" ")[1];
      const accessTokendata = checkAccessToken(accessToken);
      const refreshTokenData = checkRefreshToken(refreshToken);

      const currentTime = Math.floor(Date.now() / 1000);

      const accessExp = tokenExp(req.access);


      //리프레쉬토큰이 만료되었다는것은, 만료기간이 다된경우와,진짜로 조작된경우 2가지
      // 만료가된경우와 조작이돼서 만료된경우 두가지를 골라야겟지

//시간이 다돼서 만료되었다 라는의미      
//만약 리프레쉬 토큰이 만료가 된경우 로그아웃 필요
//리프레쉬 토큰이 만료가 됐으며 어떻게 로그아웃을할까?

      if (accessExp < currentTime) {

        const getUserInfo = await user.findOne({
          where: {
            id: req.body.id,
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
          const refreshExp = tokenExp(refreshToken);
  
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
          const refreshExp = tokenExp(refreshToken);
  
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
          const refreshExp = tokenExp(refreshToken);
  
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

      }
      else if (!accessTokendata) {
        return res.status(401).send("토큰이 만료되었습니다.");
      }
     
      // return data
      req.access = accessToken;
      req.user = accessTokendata;
      req.refresh = refreshToken
      req.issue = refreshTokenData

    } catch (err) {
      console.log("rmsu");
      return res.status(501).send(err);
    }

    return next();

    // return res.status(200).send({data:data})
  },
  accessTokenReissue: (req, res, next) => {

    //refreshToken으로 재발급하는 미들웨어

    const refreshToken = req.cookies.refreshToken;

    const authorization =
      req.headers["Authorization"] || req.headers["authorization"];
    //accesstoken이 존재하지 않는경우 넘어간다. 로그인이 되지 않은경우

    if (!authorization || !refreshToken) {
      //토큰이 없으면 넘어간다 -> 로그인 되지 않은경우
      return next();
    }
    // console.log("enqjs");

    try {
      //토큰이 존재하는경우 -> 로그인 하는경우 반드시 액세스, 리프레쉬 발급
      const accessToken = authorization.split(" ")[1];
      const accessTokendata = checkAccessToken(accessToken);
      const refreshTokenData = checkRefreshToken(refreshToken);

      const currentTime = Math.floor(Date.now() / 1000);

      const accessExp = tokenExp(req.access);


      //리프레쉬토큰이 만료되었다는것은, 만료기간이 다된경우와,진짜로 조작된경우 2가지
      // 만료가된경우와 조작이돼서 만료된경우 두가지를 골라야겟지

//시간이 다돼서 만료되었다 라는의미      
//만약 리프레쉬 토큰이 만료가 된경우 로그아웃 필요
//리프레쉬 토큰이 만료가 됐으며 어떻게 로그아웃을할까?

      if (accessExp < currentTime) {

        const getUserInfo = await user.findOne({
          where: {
            id: req.body.id,
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
          const refreshExp = tokenExp(refreshToken);
  
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
          const refreshExp = tokenExp(refreshToken);
  
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
          const refreshExp = tokenExp(refreshToken);
  
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

      }
      else if (!accessTokendata) {
        return res.status(401).send("토큰이 만료되었습니다.");
      }
     
      // return data
      req.access = accessToken;
      req.user = accessTokendata;

    } catch (err) {
      console.log("rmsu");
      return res.status(501).send(err);
    }

    return next();

    // return res.status(200).send({data:data})
  },

};
