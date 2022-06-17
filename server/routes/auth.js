const router = require("express").Router();
const app = express();
const controller = require("../controllers/auth");


router.post('/signin',controller.signupControl)