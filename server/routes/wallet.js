const router = require("express").Router();
const controller = require("../controller/wallet");


router.get('/subregist',controller.subscribesInfo)
router.post('/regist',controller.walletRegister)
router.get('/walletinfo',controller.walletInfo)
router.get('/payment',controller.paymentControll)
router.get('/paymentmanage',controller.paymentManagementControll)
router.delete('/walletdelete',controller.walletDelete)



module.exports = router