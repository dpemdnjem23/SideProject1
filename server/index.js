const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyparser = require('body-parser')
const app = express();
const Port =process.env.PORT|| 5001;
const {authchecker} = require('./middleware/authChecker');
const authRouter = require('./routes/auth')

const userRouter = require('./routes/user');
const walletRouter = require('./routes/wallet')
app.use(express.json()); //미들웨어
app.use(express.urlencoded({ extended: true })); //미들웨어

app.use(cookieParser()); // 미들웨어

app.use(
  cors({
    origin: [process.env.CLIENT_URL,"http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE","OPTIONS"],
    credentials: true,
  })
);
    
// app.use('/', function (req, res) {
//   console.log(req.body,'main');
// });
   
//routes


app.use(authchecker)

app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/wallet',walletRouter)



// app.get("/", (req, res) => {
//   res.send("Hello Nodes.js");
// });

app.listen(Port, () => {
  console.log(`Server is Startin on ${Port}`);
});
