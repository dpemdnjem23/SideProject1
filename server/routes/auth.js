const router = require("express").Router();
const controller = require("../controller/auth");

router.post("/signup", controller.signupControl);
router.post("/signin", controller.signinControl);


module.exports =  router