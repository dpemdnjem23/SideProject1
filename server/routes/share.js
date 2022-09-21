const router = require("express").Router();
const controller = require("../controller/share");

router.post('/register',controller.registerShare)


module.exports = router