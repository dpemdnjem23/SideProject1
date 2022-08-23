const router = require("express").Router();
const controller = require("../controller/wallet");


router.get('/subregist',controller.subscribesInfo)
router.post('/regist',controller.walletRegister)
router.get('/info',controller.walletInfo)
router.get('/payment',controller.paymentControll)
router.get('/paymentmanage',controller.paymentManagementControll)
router.delete('/eliminate',controller.walletDelete)
router.patch('/edit',controller.walletEdit)
router.get('/toptwo',controller.walletRenewalPeriod)
router.patch('/startdate',controller.walletStartDate)




module.exports = router