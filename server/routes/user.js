const router = require("express").Router();
const controller = require("../controller/user");


router.delete('/withdrawal',controller.withdrawalControl)
router.patch('/edit',controller.editUserControl)
router.get('/info',controller.getUserInfo)

module.exports  = router