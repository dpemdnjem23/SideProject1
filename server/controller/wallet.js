require("dotenv").config();

const { default: axios } = require("axios");
;
const { authchecker } = require("../middleware/authChecker");
// const { exit } = require("process");

const { user,wallet } = require("../models");

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

    walletInfo:async(req,res) =>{
        
        //
        
        //구독 지갑은 해당하는 유저의 구독 정보만 보여줘야 한다.
        // startdate 순으로 배치한다.

        const findWallet = await wallet.findAll({where:{user_id:req.user.id},order:[['start_data','ASC']]}

        )

        if(!findWallet){
            return res.status(400).send('회원을 찾을수가 없습니다.')
        }

        return res.status(200).send({data:findWallet})
    


    },

    walletRegister:async(req,res) =>{
        //같은 이름을가진 구독상품은 존재x
        //user를 확인하고, 구독상품을 만들어야 한다.
        //토큰이 존재해야한다. => middleware
      

        const { id,name,cost,start_date,cycle,image}

        if(!name&&cost&&start_date&&cycle&&image){
            return res.status(400).send('구독 정보는 전부 입력해야한다.')
        }

        const userInfo = await user.findByPk(id)

        if(!userInfo){
            return res.status(400).send('존재하지 않는 회원입니다.')
        }
       await wallet.create({user_id:userInfo.id,name:name,cost:cost,
            start_date:start_date,cycle:cycle,cost:cost,image:image})

        //지갑에 들어갈 목록 생성


        return res.status(200).send('구독목록이 생성 되었습니다.')




    },







}