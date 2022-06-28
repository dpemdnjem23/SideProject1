require("dotenv").config();
const cookieParser = require("cookie-parser");
const { sign, verify } = require("jsonwebtoken");
// const { NONE } = require("sequelize");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "10m" });
  },
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "1d" });h
  },

  checkRefreshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  },
  sendCookie:(res,refreshToken) =>{

    res.cookie('refreshToken',refreshToken,{
      httpOnly:'true',sameSite:'none'
    })
  }
};
