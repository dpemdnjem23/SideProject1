require("dotenv").config();

const axios  =  require('axios')
const crypto = require("crypto");
const { authchecker } = require("../middleware/authChecker");
// const { exit } = require("process");

const { user } = require("../models");

const {
  generateAccessToken,
  generateRefreshToken,
  sendCookie,
  checkRefreshToken,
  tokenExp,
} = require("../utils/jwt");

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

module.exports = {
  withdrawalControl: async (req, res) => {
      //회원탈퇴 아이디, 닉네임 ,id 가일치하는 정보를 찾아 로그아웃한다.
      //회원탈퇴할때 만약 id가없어 탈퇴할수가 없는경우. 고려하지 않는다 왜냐 id가 엇으면 탈퇴x
     
    const { id} = req.body;

    const isUser = await user.findByPk(id);
    //일반 유저인경우
    console.log(isUser)
try{


    if(isUser.social_user===false){

        if(isUser.username){
           await user.destroy({where:{id:id}})
    
            return res.status(200).send('회원 탈퇴 완료')
        }

        return res.status(400).send('소셜 로그인 유저 ')
    

    }

  }catch(err){
    return res.status(500).send(err)
  }


      //소셜 로그인과, 소셜로그인이 아닌 경우로 나눈다.

    //가입되지 않은 경우 가입한다.
  },

  editUserControl :async (req,res) =>{

  }
};
