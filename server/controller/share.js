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


        try{

            await share.create


        }catch(err){
            return res.status(500).send(err)
        }



    }

    ,



    



}