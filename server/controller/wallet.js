require("dotenv").config();
const moment = require("moment");
const { Op, Sequelize } = require("sequelize");

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

module.exports = {
  //1. 월렛을 불러온다.
  //2. 월렛을 create한다
  //3. 월렛을 삭제한다.
  //4. 월렛을 변경한다.
  //5. 구독 목록을 불러온다.
  //6. 월렛의 date를 컨트롤 해야한다. 오늘날 end_date에 도달했을때,
  //7. start <-> end 를 해주고 start는 다시
  //8. start_date를 이용해 비용 계산
  //9. 결제현황 관리
  //10. start_date 변경

  walletStartDate: async (req, res) => {
    const { start_date, id } = req.body;

    console.log(start_date, id);

    // if(cost&&!cycleDay&&!cycleMonth&!cycleYear){
    try {
      let calculateEnd_date;

      const userId = req.user.userId || req.user.id;

      const walletInfo = await wallet.findOne({
        where: { id: id, user_id: userId },
      });

      console.log(walletInfo.start_date, start_date);

      if (walletInfo.start_date === start_date) {
        return res.status(400).send("같은날짜로는 변경할수 없습니다.");
      }

      calculateEnd_date = moment(start_date)
        .add(
          Number(walletInfo.cycleDay) +
            Number(walletInfo.cycleMonth) * 30 +
            Number(walletInfo.cycleYear) * 365,
          "d"
        )
        .format("YYYY-MM-DD");

      const walletEdit = await wallet.update(
        {
          start_date: start_date,

          end_date: calculateEnd_date,
        },

        { where: { user_id: userId, id: id } }
      );

      if (!walletEdit) {
        return res.status(400).send("휴");
      }

      return res.status(200).send("변경완료");
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  walletDelete: async (req, res) => {
    //case 1 ,2 일반 유저, social 유저

    const { id } = req.body;

    const userId = req.user.userId || req.user.id;
    try {
      //id

      // const walletInfo = await wallet.findOne({where:{user_id:userId,}})

      // const walletInfo = await wall

      const walletDelete = await wallet.destroy({
        where: { user_id: userId, id: id },
      });

      if (!walletDelete) {
        return res.status(400).send("삭제가안됨");
      }

      return res.status(200).send("삭제되었씁니다.");
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  paymentManagementControll: async (req, res) => {
    const paymentArr = [];
    const userId = req.user.userId || req.user.id;
    try {
      // const today = moment().format('YYYY-MM-DD')

      // 8월 2일이야,  8월 7일 이 결제일 findAll
      // 8월 2일보단크고, 8월 7일보다는 작은값들을 찾으면된다.
      const findWallet = await wallet.findAll({
        order: [["end_date", "ASC"]],
        where: {
          user_id: userId,
        },
      });

      // console.log(findWallet, "find");

      //기준점이되는 날짜 가장빠름

      for (let i = 0; i < findWallet.length; i++) {
        if (
          findWallet[0].dataValues.end_date ===
          findWallet[i].dataValues.end_date
        ) {
          paymentArr.push(findWallet[i].dataValues);
        }
      }

      //날짜별로 select를 한다. 가장 빠른날짜가 앞에있겠지.
      //그럼 똑같은 날짜를뽑아서 넘겨 준다.

      return res.status(200).send({ data: paymentArr });
      //오늘과 가장가까운 결제일 찾기
      //그 결제일남은 기간 + cost를 찾는다
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  paymentControll: async (req, res) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const userId = req.user.userId || req.user.id;

    try {
      //start_date 기간은 1달로 한다.
      // start_date에 도달하면 기간이 gte인경우 결제금액을 +한다.
      const today = moment().format("YYYY-MM-DD");
      const day = moment().format("DD");
      const year = moment().format("YYYY");
      const month = moment().format("MM");
      let sum = 0;
      console.log(month)

      const findWallet = await wallet.findAll({
        where: { user_id: userId, start_date: { [Op.lte]: today } },
        attributes: [
          "name",
          "cost",
          "start_date",
          "cycleDay",
          "cycleMonth",
          "cycleYear",
        ],
      });
      //1월 1일부터 1월 lastday까지

      //1달기준이면 findWallet으로 한달동안

      // 5월 3일이다.
      //만약에 주기가 6개월이다
      //end_date가 11월에 있다 그러면 얘는 계산할필요가 없어

      // 주기가 한달이면?
      //

      const getMonthWalletCost = await wallet.findAll({
        where: { user_id: userId, start_date: { [Op.lte]: today } },
        attributes: [
          "name",
          "cost",
          "start_date",
          "cycleDay",
          "cycleMonth",
          "cycleYear",
        ],
      });

      console.log(findWallet);

      //1. 주기를 계산한다 day , month year -> 1달을 기준(1~xx)
      //주기가 3일  -> lasday/주기  * cost
      //2. 주기는 last day를 넘지 않는다.

      //기준일이 day일때

      for (let i = 0; i < findWallet.length; i++) {
        //1. 주기가곧start_date이므로 emaining계사해서

        const remaningDays = lastDayOfMonth - day;

        // if()
        if (findWallet[i].dataValues.cycleDay) {
          const subCost =
            (remaningDays / findWallet[i].dataValues.cycleDay) *
            findWallet[i].dataValues.cost;

          console.log(
            remaningDays,
            remaningDays / findWallet[i].dataValues.cycleDay,
            findWallet[i].name,
            findWallet[i].dataValues.cycleMonth
          );
          sum=sum+subCost
        }
        else{

          console.log('2',findWallet[i].dataValues.name)
          sum=sum+findWallet[i].dataValues.cost

        }
        console.log(sum);

      }

      //만약 주기가 6개월이라면?

      if (!findWallet) {
        return res.status(400).send("수정할게 없다.");
      }

      return res.status(200).send({ data: findWallet });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  subscribesInfo: async (req, res) => {
    // console.log(req.user,'req.user')
    //구독 목록을 불러올때 로그인을 한상황이어야 한다.
    if (!req.user) {
      return res.status(401).send("로그인 후 볼수있다.");
    }

    try {
      const subInfo = await subscribe.findAll();
      return res.status(200).send({ data: subInfo });
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  walletInfo: async (req, res) => {
    //

    //구독 지갑은 해당하는 유저의 구독 정보만 보여줘야 한다.
    // startdate 순으로 배치한다.

    console.log(req.user, "req.user");

    const userId = req.user.userId || req.user.id;

    try {
      const findWallet = await wallet.findAll({
        where: { user_id: userId },
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

    const { name, cost, start_date, cycleDay, cycleMonth, cycleYear } =
      req.body;

    const userId = req.user.userId || req.user.id;

    //cycle 은 1년인경우 365일, 1달인경우 30일로 계산되어야 한다.
    // => start date에 더해짐

    if (!name || !cost || !start_date) {
      return res.status(400).send("구독 정보는 전부 입력해야한다.");
    }
    //데이만 입력하는경우
    if (!cycleDay && !cycleMonth && !cycleYear) {
      return res.status(400).send("구독 정보는 전부 입력해야한다.");
    }

    try {
      const subscribes = await subscribe.findOne({ where: { sub_name: name } });

      if (!subscribes) {
        return res.status(400).send("존재하지 않습니다.");
      }
      const calculateEnd_date = moment(start_date)
        .add(
          Number(cycleDay) + Number(cycleMonth) * 30 + Number(cycleYear) * 365,
          "d"
        )
        .format("YYYY-MM-DD");

      //cycle을 1년 1달 1일로 나타내고싶다.

      const createWallet = await wallet.create({
        user_id: userId,
        name: name,
        start_date: start_date,
        cycleDay: cycleDay,
        cycleMonth: cycleMonth,
        cycleYear: cycleYear,
        cost: cost,
        end_date: calculateEnd_date,
        image: subscribes.image,
      });
      if (!createWallet) {
        return res.status(400).send("구독 목록 생성이 안되었습니다.");
      }
      //지갑에 들어갈 목록 생성

      return res.status(200).send("구독목록이 생성 되었습니다.");
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  walletEdit: async (req, res) => {
    const { id, cost, cycleDay, cycleMonth, cycleYear, start_date } = req.body;

    let varCost = cost;
    let varCycleDay = cycleDay;
    let varCycleMonth = cycleMonth;
    let varCycleYear = cycleYear;
    const userId = req.user.userId || req.user.id;

    try {
      let calculateEnd_date;
      //cycle, cost , start_date , end_date

      //3가지경우 => start_date는 항상 값이 주어져 있다.
      //1. 가격만 변경하는경우
      //2 cycle에서 cycle year,cyclmonth, cycleday
      //가격 +cycle 모두 변경하는경우
      //wallet 을 찾아서 cost,cycle이 존재하지 않으면 => 그대로 사용
      //

      const walletInfo = await wallet.findOne({
        where: { user_id: userId, id: id },
      });
      console.log(walletInfo, "wall");

      if (!walletInfo) {
        return res.status(400).send("찾을수 없습니다.");
      }

      if (!cost) {
        varCost = walletInfo.cost;
      }
      if (cycleDay || cycleMonth || cycleYear) {
        calculateEnd_date = moment(start_date)
          .add(
            Number(cycleDay) +
              Number(cycleMonth) * 30 +
              Number(cycleYear) * 365,
            "d"
          )
          .format("YYYY-MM-DD");
      } else if (!cycleDay && !cycleMonth && !cycleYear) {
        calculateEnd_date = moment(start_date)
          .add(
            Number(walletInfo.cycleDay) +
              Number(walletInfo.cycleMonth) * 30 +
              Number(walletInfo.cycleYear) * 365,
            "d"
          )
          .format("YYYY-MM-DD");
        varCycleDay = walletInfo.cycleDay;
        varCycleMonth = walletInfo.cycleMonth;
        cvarCycleYear = walletInfo.cycleYear;
      }
      console.log(
        varCost,
        start_date,
        cycleDay,
        cycleMonth,
        cycleYear,
        calculateEnd_date
      );

      //입력된 값이 들어온다면, 그값을쓰고
      //만약에 그렇지 않다면 info 값ㅇ르 쓴다.

      // if(cost&&!cycleDay&&!cycleMonth&!cycleYear){

      const walletEdit = await wallet.update(
        {
          cost: varCost,
          start_date: start_date,
          cycleDay: varCycleDay,
          cycleMonth: varCycleMonth,
          cycleYear: varCycleYear,
          end_date: calculateEnd_date,
        },

        { where: { user_id: userId, id: id } }
      );
      console.log(walletEdit, "walletEdit");

      if (!walletEdit) {
        return res.status(400).send("변경이 불가능");
      }

      return res.status(200).send("변경되었습니다.");
      // }
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  TopTwo: async (req, res) => {
    const userId = req.user.userId || req.user.id;

    try {
      const topTwoPeriod = await wallet.findAll({
        where: { user_id: userId },
        order: [["end_date", "ASC"]],
        limit: 2,
        attributes: [
          // specify an array where the first element is the SQL function and the second is the alias
          [Sequelize.fn("DISTINCT", Sequelize.col("end_date")), "end_date"],
        ],
      });

      if (!topTwoPeriod) {
        return res.status(400).send("날짜를 알수없다.");
      }
      //이게 문제네 2개일경우만 나타남

      if (topTwoPeriod.length === 1) {
        const walletInfo = await wallet.findAll({
          where: {
            end_date: topTwoPeriod[0].dataValues.end_date,
          },
        });

        if (!walletInfo) {
          return res.status(400).send("walletInfo err");
        }

        return res.status(200).send({ data: topTwoPeriod, wallet: walletInfo });
      } else {
        const walletInfo = await wallet.findAll({
          where: {
            [Op.or]: [
              { end_date: topTwoPeriod[0].dataValues.end_date },
              { end_date: topTwoPeriod[1].dataValues.end_date },
            ],
          },
        });

        if (!walletInfo) {
          return res.status(400).send("walletInfo err");
        }

        return res.status(200).send({ data: topTwoPeriod, wallet: walletInfo });
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
