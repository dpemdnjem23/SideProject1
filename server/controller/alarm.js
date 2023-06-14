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
  //3. read값을 바꿔준다.
  //4. 알람 정보를 삭제한다.

  alarmDelete: async (req, res) => {
    const today = moment().toDate()

    try {
      console.log(today)
      const alarmInfo = await alarm.findAll({});
      console.log(alarmInfo[0].dataValues.readAt,)

      // console.log(
      //   moment(alarmInfo[0].dataValues.readAt)
      //     .add(7, "days")
      //     .format("YYYY-MM-DD") > today
      // );

      const alarmDel = await alarm.destroy({
        where: { read: true, readAt: {[Op.gte]:today}},
      });

      console.log("삭제",alarmDel);
      // console.log(alarmInfo)


      // if (!alarmInfo) {
      //   return res.status(400).send("삭제실패");
      // }

      return res.status(200).send("삭제완료");
    } catch (err) {
      return res.status(500).send("삭제실패햇어 좀!");
    }
  },

  alarmReadUpdate: async (req, res) => {
    const { id } = req.body;
    const today = moment().format("YYYY-MM-DD");

    try {
      const userId = req.user.userId || req.user.id;

      if (id) {
        const alarmUpdate = await alarm.update(
          { read: true, readAt: today },
          { where: { id: id, user_id: userId } }
        );

        if (!alarmUpdate) {
          return res.status(400).send("안돼");
        }

        //벌크 업데이트를 하는경우 , 만약 id가 여러개라면?
        // 모두 읽음 처리를 누르는경우
        return res.status(200).send("변경되었습니다.");
      } else {
        //read가 false인것만 찾고 반복문을 이용해 전부다
        //true로 바꿔준다.

        const alarmInfo = await alarm.findAll({
          where: { read: false, user_id: userId },
        });

        for (let i = 0; i < alarmInfo.length; i++) {
          const alarmInfoId = alarmInfo[i].id;

          console.log(alarmInfo);

          const alarmUpdate = await alarm.update(
            { read: true, readAt: today },
            { where: { id: alarmInfoId, user_id: userId } }
          );

          if (!alarmUpdate) {
            return res.status(400).send("업데이트 안됨");
          }
        }

        return res.status(200).send("모두 읽음 처리");
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  alarmRegister: async (req, res) => {
    // console.log(req.body)
    //end_date, start_date

    const today = moment().format("YYYY-MM-DD");
    const userId = req.user.userId || req.user.id;

    try {
      // console.log(userId);

      const walletInfo = await wallet.findAll({
        where: { user_id: userId },
      });

      for (let i = 0; i < walletInfo.length; i++) {
        const day = moment(walletInfo[i].end_date).diff(today, "days");

        //3일이상
        if (day <= 3) {
          console.log(day, walletInfo[i].dataValues.id, "day");

          const alarmInfo = await alarm.findOne({
            where: {
              wallet_id: walletInfo[i].dataValues.id,
            },
          });

          // console.log(alarmInfo, "alarmInfo");

          //존재하는 알람인지 확인
          //존재하지 않는경우 생성해준다.
          if (!alarmInfo) {
            await alarm.create({
              user_id: userId,
              wallet_id: walletInfo[i].dataValues.id,
              title: walletInfo[i].dataValues.name,
              image: walletInfo[i].dataValues.image,
              remain_time: day,
              read: false,
            });

            // 없을경우 생성한다. 만약, 존재한다면?
          }
        } else {
          //존재하면 생성할 필요 없다. 여러개의 wallet이 들어올수도
          //있음으로

          continue;
        }
      }

      return res.status(200).send("알람이 생성 되었습니다.");

      //3일 이하가 남앗을때 작동한다
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  alarmInfo: async (req, res) => {
    const userId = req.user.userId || req.user.id;

    try {
      const alarmInfo = await alarm.findAll({ where: { user_id: userId } });

      console.log(alarmInfo);
      if (!alarmInfo) {
        return res.status(400).send("알람이 없어 ㅠ");
      }

      return res.status(200).send({ data: alarmInfo });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  //알람창에는 접속했을시 알람을 보내준다.
};
