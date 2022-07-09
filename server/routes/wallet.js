const router = require("express").Router();
const controller = require("../controller/wallet");


router.get('/subregist',controller.subscribesInfo)




module.exports = router