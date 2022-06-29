require("dotenv").config();
const router = require("express").Router();
const { verify } = require("jsonwebtoken");
module.exports={

  isAuthorized: (req) => {
    const authorization =
      req.headers["Authorization"] || req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    const token = authorization.split(" ")[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  },

}