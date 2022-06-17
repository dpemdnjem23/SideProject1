require('dotenv').config();
const router = require("express").Router();
const {sigm, verify} =require('jsonwebtoken')

module.exports ={

    authchecker:(req,res,next) =>{
      try {
        const authorization =
        req.headers["Authorization"] || req.headers["authorization"];
   
      const token = authorization.split(" ")[1]; // `Bearer ${Authorization}`
    

      if(token ){
        return res.status(401).send('JWT expired')
      }
        return verify(token, process.env.ACCESS_SECRET);
      } catch (err) {
        return res.status(401).send('Token does not exist')
      }

    }
}