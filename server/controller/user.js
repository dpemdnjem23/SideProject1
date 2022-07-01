require("dotenv").config();
const crypto = require("crypto");

module.exports = {
  withdrawalControl: async (req, res) => {
      //회원탈퇴
    const { email, nickname, password } = req.body;
    const existUser = await User.findOne({ where: { email } });
    //가입되지 않은 경우 가입한다.
  },
};
