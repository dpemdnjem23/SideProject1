const router = require("express").Router();
const auth = require("../controller/auth");
const controller = require("../controller/auth");
// const authChecker = require('../middleware/authChecker')

router.post("/signup", controller.signupControl);
router.post("/signin", controller.signinControl);
router.get("/signout", controller.signoutControl);
router.post("/nickcheck", controller.nickcheckControl);
router.post("/usernamecheck", controller.usernameCheckControl);
router.post('/issueaccess',controller.accessTokenReissuaControl)

module.exports = router;
