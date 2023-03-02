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
const { off } = require("process");

module.exports = {
  //페이지 네이션,

  shareDelete: async (req, res) => {},

  registerShare: async (req, res) => {
    const { title, list_sub, description } = req.body;


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
        list_sub: { list_sub: arr },
      });

      if (!shareRegister) {
        return res.status(400).send("공유가 생성되지않았습니다.");
      }
      return res.status(200).send("공유에 성공하였습니다. ");
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  shareInfo: async (req, res) => {
    try {
      //req.query 페이지 번호
      let pageNum = Number(req.query.page||1)
      let offset =0
      // const offset = start

      if(pageNum>1){
        offset = 6*(pageNum-1);
      }

      
      //userid를 1대1 매칭시켜서 nickname으로
      const shareInfo = await share.findAll({
    
        limit:6,

        offset:offset,
        include: [{ model: user, attributes: ["nickname"] }],
        order: [["createdAt", "DESC"]],
      });
      const countShareInfo = await share.findAll({})

      // console.log(shareInfo)

      
      return res.status(200).send({shareInfo:shareInfo,countShareInfo:countShareInfo.length});
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  shareSelectInfo: async (req, res) => {
    //선택한 share의 인포를 보여준다.
    //만약, 나의 share라면 수정, 삭제 가 가능하도록 한다
  },
};
