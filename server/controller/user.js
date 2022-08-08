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
    else{


    
        // await axios.get('https://kapi.kakao.com/v1/user/unlink', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
      await user.destroy({where:{id:id}})
    
      return res.status(200).send('회원 탈퇴 완료')

    }

  }catch(err){
    return res.status(500).send(err)
  }


      //소셜 로그인과, 소셜로그인이 아닌 경우로 나눈다.

    //가입되지 않은 경우 가입한다.
  },

  editUserControl :async (req,res) =>{
//닉네임 , 비밀번호 변경
   const {nickname,password,id} = req.body
    try{


      //먼저 닉네임이 존재하는지 확인한다.
      //닉네임이 
      if(!password){
        console.log(req.body)

        
        //동일한 닉네임이 없는경우 update
       const updateNick =  await user.update({nickname:nickname},{where:{
          id:req.user.userId
        }})

        if(!updateNick){
          return res.status(400).send('업데이트가 되지 않습니다.')
        }

        return res.status(200).send('닉네임 업데이트')


        //
      }
      else{


        crypto.randomBytes(64, (err, buf) => {
          if (err) {
            throw err;
          } else {
            const salt = buf.toString("base64");
            crypto.pbkdf2(
              password,
              salt,
              11011,
              64,
              "sha512",
              async (err, key) => {
                if (err) {
                  throw err;
                } else {
                  const hardPassword = key.toString("base64");
                  const insertUser = await user.update({
                    password: hardPassword,
                    salt: salt,
                  where:{id:id}});
                  if (!insertUser) {
                    return res.status(400).send("변경실패");
                  } 
                    return res.status(201).send("패스워드 변경 성공");
                  
                }
              }
            );
          }
        });
        //pw는 동일한 pw를 살필 필요는없다. 이미 앞에서 pw는 확인을 거친 상황


      }
  
       

    }catch(err){
      return res.status(500).send(err)

    }

  

}
};
