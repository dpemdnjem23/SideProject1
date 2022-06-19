require("dotenv").config();
const router = require("express").Router();
const { verify } = require("jsonwebtoken");

module.exports = {
  authchecker: (req, res, next) => {
    try {
      const authorization =
        req.headers["Authorization"] || req.headers["authorization"];

      const token = authorization.split(" ")[1]; // `Bearer ${Authorization}`


      // console.log(token,'authchecker token')
      if (!token) {
        return res.status(401).send("JWT expired");
      }



      // console.log(verify(token, process.env.ACCESS_SECRET))
    const data = verify(token, process.env.ACCESS_SECRET);

    // return data
req.request = data    
next()
    // return res.status(200).send({data:data})

    
    } catch (err) {
      
      next()
    }
  },
};
