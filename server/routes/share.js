const router = require("express").Router();
const controller = require("../controller/share");

router.post('/register',controller.registerShare)
router.get('/info/:page',controller.shareInfo)


module.exports = router