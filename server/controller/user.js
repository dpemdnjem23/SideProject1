require("dotenv").config();

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


module.exports = {
  withdrawalControl: async (req, res) => {
      //회원탈퇴 아이디, 닉네임 ,id 가일치하는 정보를 찾아 로그아웃한다.
     
    const { id} = req.body;
    const isUser = await user.findByPk(id);
    //일반 유저인경우

    if(isUser.social_user===false){

        if(isUser.username){
           await user.destroy({where:{id:id}})
    
            return res.status(200).send('회원 탈퇴 완료')
        }

        return res.status(400).send('소셜 로그인 유저')
    

    }


    //소셜 로그인과, 소셜로그인이 아닌 경우로 나눈다.

    //가입되지 않은 경우 가입한다.
  },

  editUserControl :async (req,res) =>{

  }
};
