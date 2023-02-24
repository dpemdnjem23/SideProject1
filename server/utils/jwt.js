require("dotenv").config();
const cookieParser = require("cookie-parser");
const { sign, verify } = require("jsonwebtoken");
// const { NONE } = require("sequelize");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "2h" });
  },
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "3d" });
  },

  checkRefreshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return res.staus(401).send("잘못된 토큰입니다.");
    }
  },

  checkAccessToken: (accessToken) => {
    try {
      return verify(accessToken, process.env.ACCESS_SECRET);
    } catch (err) {
      return res.staus(401).send("잘못된 토큰입니다.");
    }
  },
  sendCookie: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
  },
  tokenExp: (Token) => {
    // const token = authorization.split(" ")[1];
    const base64Payload = Token.split(".")[1];

    const payload = Buffer.from(base64Payload, "base64");
    const result = JSON.parse(payload.toString());

    return result.exp;
  },
};
