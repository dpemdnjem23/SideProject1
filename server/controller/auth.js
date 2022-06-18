require("dotenv").config();

const crypto = require("crypto");
// const { exit } = require("process");

const {user} = require("../models");

module.exports = {
  signupControl: async (req, res) => {
    try {
      const { email, nickname, password } = req.body;
      // console.log(await models.user.create({email:email}))

      const existUser = await user.findOne({ where: { email } });
      //가입되지 않은 경우 가입한다.

      if (existUser) {
        return res.status(401).send("이미 가입된 아이디입니다.");
      } else {
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
                  const harPassword = key.toString("base64");
                  const insertUser = await user.create({
                    email: email,
                    nickname: nickname,
                    password: harPassword,
                    salt: salt,
                  });
                  if (!insertUser) {
                    return res.status(400).send("가입실패");
                  } else {
                    return res.status(201).send("가입 성공");
                  }
                }
              }
            );
          }
        });
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  signinControl: async (req, res) => {
    const { email, password } = req.body;

    const salt = await user.findOne({ attributes: ["salt"], where: { email } });

    console.log(salt.dataValues.salt);
    //2. 유저 db에서 이메일 확인하기
    if(salt.dataValues.salt ===null){
      return res.status(404).send('')

    }

    crypto.pbkdf2(password, salt);
  },
};
