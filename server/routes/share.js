const router = require("express").Router();
const controller = require("../controller/share");

router.post('/register',controller.registerShare)
router.get('/info',controller.shareInfo)
router.get('/selectinfo',controller.shareSelectInfo)
router.delete('/delete',controller.shareDelete)
router.patch('/edit',controller.shareEdit)


module.exports = router