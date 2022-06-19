const router = require("express").Router();
const controller = require("../controller/auth");

router.post("/signup", controller.signupControl);
router.post("/signin", controller.signinControl);
router.get('/signout' , controller.signoutControl)
router.post('/nickcheck',controller.nickcheckControl)
router.post('/usernamecheck',controller.usernameCheckControl)


module.exports =  router