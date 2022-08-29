const router = require("express").Router();
const controller = require("../controller/alarm");
// const authChecker = require('../middleware/authChecker')
router.post('/register',controller.alarmRegister)

module.exports = router;
