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

  shareDelete: async (req, res) => {},

  registerShare: async (req, res) => {
    const { title, list_sub, description } = req.body;

    console.log(title, list_sub, description, "makemeStrong");

    const userId = req.user.userId || req.user.id;

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


      const shareRegister = await share.create({
        title: title,
        user_id: userId,
        description: description,
        list_sub: {list_sub:arr},
      });


      if (!shareRegister) {
        return res.status(400).send("공유가 생성되지않았습니다.");
      }
      return res.status(200).send('공유에 성공하였습니다. ')
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  shareInfo: async (req, res) => {
    try {
      //userid를 1대1 매칭시켜서 nickname으로
      const shareInfo = await share.findAll({
        include: [{ model: user, attributes: ["nickname"] }],
      });
console.log(shareInfo)

      //닉네임은 어쩌지? user_id를 참조해놨으니
      //user_id에 해당하는

      return res.status(200).send(shareInfo);
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  shareSelectInfo: async (req, res) => {
    //선택한 share의 인포를 보여준다.
    //만약, 나의 share라면 수정, 삭제 가 가능하도록 한다
  },
};
