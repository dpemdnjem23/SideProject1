require("dotenv").config();
const moment = require("moment");
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

  walletDelete:async (req,res) =>{
  

    const {name} = req.body
    console.log(req.body)
    try{

      // const walletInfo = await wall

     const s=  await wallet.destroy({where:{user_id:req.user.userId}})


     if(!s) {
       return res.status(400).send('삭제가안됨')
     }


      return res.status(200).send('삭제되었씁니다.')
    }catch(err){
      return res.status(500).send(err)
    }

  },

  paymentManagementControll: async (req, res) => {

    const paymentArr = []
    const today = moment().format('YYYY-MM-DD')
    const userId = req.user.userId ||req.user.id
    try {


      // const today = moment().format('YYYY-MM-DD')

      // 8월 2일이야,  8월 7일 이 결제일 findAll
      // 8월 2일보단크고, 8월 7일보다는 작은값들을 찾으면된다.
      const findWallet = await wallet.findAll({order: [["end_date", "ASC"]],
        where: {
          user_id: userId,
        },  
      });

      console.log(findWallet,'find')

      


        //기준점이되는 날짜 가장빠름

        for(let i = 0 ; i<findWallet.length;i++){
          if(findWallet[0].dataValues.end_date===findWallet[i].dataValues.end_date){

            paymentArr.push(findWallet[i].dataValues)
          }
          
        }

        console.log(paymentArr,'paymentArr')

      

        // console.log(s)

        if(paymentArr.length===0){
          console.log('시작')
          return res.status(200).send({data:paymentArr,date:paymenDate})

        }
              
     

     
   console.log(paymenDate,'date')
      //날짜별로 select를 한다. 가장 빠른날짜가 앞에있겠지.
      //그럼 똑같은 날짜를뽑아서 넘겨 준다.

      return res.status(200).send({data:paymentArr,date:paymenDate})
      //오늘과 가장가까운 결제일 찾기
      //그 결제일남은 기간 + cost를 찾는다
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  paymentControll: async (req, res) => {
    try {
      //start_date 기간은 1달로 한다.
      // start_date에 도달하면 기간이 gte인경우 결제금액을 +한다.
      const today = moment().format("YYYY-MM-DD");

      const findWallet = await wallet.findAll({
        where: { start_date: { [Op.lte]: today } },
        attributes: ["cost"],
      });

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

    const userId = req.user.userId ||req.user.id
  

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

      if(!subscribes){
        return res.status(400).send('존재하지 않습니다.')
      }
      const calculateEnd_date = moment(start_date)
        .add(
          Number(cycleDay) + Number(cycleMonth) * 30 + Number(cycleYear) * 365,
          "d"
        )
        .format("YYYY-MM-DD");

      console.log(req.body, calculateEnd_date, subscribes.image);

      //cycle을 1년 1달 1일로 나타내고싶다.

      const createWallet = await wallet.create({
        user_id: req.user.userId,
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
};
