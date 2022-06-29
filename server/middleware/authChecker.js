require("dotenv").config();
const router = require("express").Router();
const { verify } = require("jsonwebtoken");
module.exports = {
  authchecker: (req, res, next) => {
    //auth가 만료 됐다면 로그인이 해제되어야한다.

    let token;
    const authorization =
      req.headers["Authorization"] || req.headers["authorization"];
    //  console.log(authorization)

    if (!authorization) {
      return next();
      // return res.status(401).send("JWT expired");
    }

    try {
      // `Bearer ${Authorization}`

      // console.log(token,'authchecker token')

      token = authorization.split(" ")[1];

      if (!token) {
        return res.status(401).send("token unhappy");
      }
      // console.log(verify(token, process.env.ACCESS_SECRET))
      const data = verify(token, process.env.ACCESS_SECRET);

      // return data
      req.user = data;
    } catch (err) {
      res.status(401);
      throw err;
    }

    next();
    // return res.status(200).send({data:data})
  },

};


