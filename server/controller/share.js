require("dotenv").config();
const moment = require("moment");
const { Op, Sequelize } = require("sequelize");

const { default: axios } = require("axios");
const { authchecker } = require("../middleware/authChecker");
// const { exit } = require("process");

const { user, wallet, subscribe, alarm, share } = require("../models");

const {
  generateAccessToken,
  generateRefreshToken,
  sendCookie,
  checkRefreshToken,
  tokenExp,
} = require("../utils/jwt");

module.exports = {
  //페이지 네이션,

  registerShare: async (req, res) => {
    const { title, list_sub, description } = req.body;

    console.log(title, list_sub, description, "makemeStrong");

    try {
      const arr = [];

      // const walletInfo = wallet.findAll({})

      //월렛인포랑 비교해서
      //해당되는것만 true로 해준다.
      //true로만
      if (!title && !description) {
        return res.status(400).send("제목과 글을 입력해주세요");
      }

      //list_sub={share:[]}
      if (list_sub.length >= 1) {
        for (let i = 0; i < list_sub.length; i++) {
          arr.push(list_sub[i].name);
        }
      }

      console.log(arr);

      const shareRegister = await share.create({
        title: title,
        description: description,
        list_sub: arr,
      });

      if (!shareRegister) {
        return res.status(400).send("공유가 생성되지않았습니다.");
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
