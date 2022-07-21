const router = require("express").Router();
const controller = require("../controller/wallet");


router.get('/subregist',controller.subscribesInfo)
router.post('/regist',controller.walletRegister)
router.get('/walletinfo',controller.walletInfo)




module.exports = router