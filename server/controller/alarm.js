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
    // console.log(req.body)
    //end_date, start_date

  

    try {
    

      const userId = req.user.userId || req.user.id;

      const walletInfo = await wallet.findAll({
        where: { user_id: userId },
      });
    
  
      for(let i = 0 ; i <walletInfo.length;i++){
  
  
        const day = moment(walletInfo[i].end_date).diff(walletInfo[i].start_date,'days')
  
  
        if(day<=3){
          const alarmInfo = await alarm.findOne({where:{
            title: walletInfo[i].dataValues.title,
            image: walletInfo[i].dataValues.image,
          }})
          //존재하는 알람인지 확인
          //존재하지 않는경우 생성해준다.
          if(!alarmInfo){


          

          const alarm = await alarm.create({
            user_id: userId,
            title: walletInfo[i].dataValues.title,
            image: walletInfo[i].dataValues.image,
            remain_time:day,
            read:false
          });

        // 없을경우 생성한다. 만약, 존재한다면?
  
          return res.status(200).send("알람이 생성 되었습니다.");
}
  


        }

        
  
      }
  
      //3일 이하가 남앗을때 작동한다
    

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
