const cron = require("node-cron");
const moment = require("moment");
const { user, wallet, alarm } = require("../models");
const { Op, Sequelize } = require("sequelize");

//매일 0시에 실행되도록
const rule = `0 33 22 * * *`;

const schuduleDateControll = cron.schedule(rule, async (req, res) => {
  try {
    console.log("실행");

    const today = moment().format("YYYY-MM-DD");
    // console.log('2022-10-30' < '2022-09-30')

    const personalWallet = await wallet.findAll({
      where: { end_date: { [Op.lte]: today } },
    });

    //start_date가 ===today 랑 같은 걸 find 한다.
    //start_date === today
    //지갑에 있는 모든 구독을 불러온다.
    //
    //today가 end_date에 도달하는 순간, 목록들을 불러온다.
    //불러온 목록들중 , cycle이 다 다르다. 이 다른 cycle들을 end_date
    //반복문으로 업데이트? sequelize 이용하여 업데이트?
    if (personalWallet.length === 0) {
      return res.status(400).send("날짜를 찾을수없다.");
    }

    personalWallet.forEach(async (v) => {
      // const startdate = v.dataValues.start_date
      const enddate = v.dataValues.end_date;

      console.log(moment(today).add(1, "d"));

      const calculateEnd_date = moment(enddate)
        .add(
          Number(v.dataValues.cycleDay) +
            Number(v.dataValues.cycleMonth) * 30 +
            Number(v.dataValues.cycleYear) * 365,
          "days"
        )
        .format("YYYY-MM-DD");
      console.log(
        enddate,
        "end",
        calculateEnd_date,
        "cal",
        Number(v.dataValues.cycleDay) +
          Number(v.dataValues.cycleMonth) * 30 +
          Number(v.dataValues.cycleYear) * 365,
        "enddd"
      );

      const updateWallet = await wallet.update(
        { start_date: enddate, end_date: calculateEnd_date },
        { where: { name: v.dataValues.name } }
      );
      // console.log(updateWallet)

      //  console.log(updateWallet)

      if (!updateWallet) {
        return res.status(400).send("업데이트 실패");
      }
    });

    return res.status(200).send("날짜가 갱신되었습니다.");
  } catch (err) {
    return res.status(500).send(err);
  }
});

const scheduleAlarmRegister = cron.schedule(rule, async (req, res) => {
  const today = moment().format("YYYY-MM-DD");

  try {
    const userId = req.user.userId || req.user.id;
    // console.log(userId);

    const walletInfo = await wallet.findAll({
      where: { user_id: userId },
    });

    for (let i = 0; i < walletInfo.length; i++) {
      const day = moment(walletInfo[i].end_date).diff(today, "days");

      if (day <= 3) {
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
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = { schuduleDateControll, scheduleAlarmRegister };
