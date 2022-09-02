const router = require("express").Router();
const controller = require("../controller/alarm");
// const authChecker = require('../middleware/authChecker')
router.post('/register',controller.alarmRegister)
router.get('/info',controller.alarmInfo)
router.patch('/update',controller.alarmReadUpdate)
module.exports = router;
