require("dotenv").config();
const moment = require("moment");
const { Op, Sequelize } = require("sequelize");

const { default: axios } = require("axios");
const { authchecker } = require("../middleware/authChecker");
// const { exit } = require("process");

const { user, wallet, subscribe,alarm } = require("../models");

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


  alarmRegister:async(req,res) =>{



  
  
  },
  alarmInfo:async(req,res) =>{

  }

//알람창에는 접속했을시 알람을 보내준다.



}