require("dotenv").config();
const moment = require("moment");
const { Op, Sequelize } = require("sequelize");

const { default: axios } = require("axios");
const { authchecker } = require("../middleware/authChecker");
// const { exit } = require("process");

const { user, wallet, subscribe, alarm ,share} = require("../models");

const {
  generateAccessToken,
  generateRefreshToken,
  sendCookie,
  checkRefreshToken,
  tokenExp,
} = require("../utils/jwt");


module.exports = {

    //페이지 네이션, 

    registerShare: async (req,res) =>{

        const { title,list_sub} = req.body

        console.log(title,list_sub)




        try{

         const shareRegister = await share.create({title:title,list_sub:list_sub})

         if(!shareRegister){
             return res.status(400).send('공유가 생성되지않았습니다.')
         }


        }catch(err){
            return res.status(500).send(err)
        }



    }

    ,



    



}