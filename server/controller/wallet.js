require("dotenv").config();
const moment = require('moment')
const { Op } = require("sequelize");


const { default: axios } = require("axios");
const { authchecker } = require("../middleware/authChecker");
// const { exit } = require("process");

const { user, wallet, subscribe } = require("../models");

const {
  generateAccessToken,
  generateRefreshToken,
  sendCookie,
  checkRefreshToken,
  tokenExp,
} = require("../utils/jwt");
const { start } = require("repl");

module.exports = {
  //1. 월렛을 불러온다.
  //2. 월렛을 create한다
  //3. 월렛을 삭제한다.
  //4. 월렛을 변경한다.
  //5. 구독 목록을 불러온다.
  //6. 월렛의 date를 컨트롤 해야한다. 오늘날 end_date에 도달했을때,
  //7. start <-> end 를 해주고 start는 다시  

  subscribesInfo: async (req, res) => {
    // console.log(req.user,'req.user')
    //구독 목록을 불러올때 로그인을 한상황이어야 한다.
    if (!req.user) {
      return res.status(401).send("로그인 후 볼수있다.");
    }

    try {
      const subInfo = await subscribe.findAll();
      return res.status(200).send({data:subInfo});
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  walletInfo: async (req, res) => {
    //

    //구독 지갑은 해당하는 유저의 구독 정보만 보여줘야 한다.
    // startdate 순으로 배치한다.


    if (!req.user) {
      return res.status(400).send("로그인 후 볼수있다.");
    }

    try {
      const findWallet = await wallet.findAll({
        where: { user_id: req.user.userId },
        
      });

      if (!findWallet) {
        return res.status(400).send("회원을 찾을수가 없습니다.");
      }


      return res.status(200).send({ data: findWallet });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  walletRegister: async (req, res) => {

    
    //같은 이름을가진 구독상품은 존재x
    //user를 확인하고, 구독상품을 만들어야 한다.
    //토큰이 존재해야한다. => middleware
    if (!req.user) {
      return res.status(401).send("로그인 후");
    }
    const { name, cost, start_date, cycle} = req.body;

    //cycle 은 1년인경우 365일, 1달인경우 30일로 계산되어야 한다.
    // => start date에 더해짐

    if(!name||!cost||!start_date||!cycle){
        return res.status(400).send('구독 정보는 전부 입력해야한다.')
    }
    try {
      const subscribes = await subscribe.findOne({ where: { sub_name: name } });

      console.log(subscribes)
      console.log(start_date)
      const calculateEnd_date = moment(start_date).add(cycle,'d').format('YYYY-MM-DD')
      console.log(calculateEnd_date)

    const createWallet =   await wallet.create({
        user_id: req.user.userId,
        name: name,
        cost: cost,
        start_date: start_date,
        cycle: cycle,
        cost: cost,
        end_date:calculateEnd_date,
        image: subscribes.image,
      });

      console.log(createWallet,'create')


      if(!createWallet){
        return res.status(400).send('구독 목록 생성이 안되었습니다.')
      }
      //지갑에 들어갈 목록 생성

      return res.status(200).send("구독목록이 생성 되었습니다.");

    } catch (err) {
      return res.status(500).send(err);
    }
  },
  
};
