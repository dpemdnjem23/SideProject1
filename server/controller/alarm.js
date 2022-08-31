require("dotenv").config();
const moment = require("moment");
const { Op, Sequelize } = require("sequelize");

const { default: axios } = require("axios");
const { authchecker } = require("../middleware/authChecker");
// const { exit } = require("process");

const { user, wallet, subscribe, alarm } = require("../models");

const {
  generateAccessToken,
  generateRefreshToken,
  sendCookie,
  checkRefreshToken,
  tokenExp,
} = require("../utils/jwt");

module.exports = {
  //1. 알람정보를 불러온다.
  //2, 알람정보를 등록한다.

  alarmRegister: async (req, res) => {
    const { title, image } = req.body;
    // console.log(req.body)
    //end_date, start_date

    const userId = req.user.userId || req.user.id;

    const walletInfo = await wallet.findAll({
      where: { user_id: userId },
    });
    console.log(walletInfo)

    for(let i = 0 ; i <walletInfo.length;i++){

      console.log(walletInfo[i].start_date,walletInfo[i].end_date)

      const day = moment(walletInfo[i].end_date).diff(walletInfo[i].start_date,'days')


      if(day>=3)
      console.log(day,'day')

    }


    try {
    
      //3일 이하가 남앗을때 작동한다
      const alarm = await alarm.create({
        user_id: userId,
        title: title,
        image: image,
      });

      return res.status(200).send("알람이 생성 되었습니다.");
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  alarmInfo: async (req, res) => {
    try {
      const userId = req.user.userId || req.user.id;

      const alarmInfo = await alarm.findAll({ where: { user_id: userId } });

      return res.status(200).send({ data: alarmInfo });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  //알람창에는 접속했을시 알람을 보내준다.
};
