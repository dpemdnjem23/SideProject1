require("dotenv").config();

const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const Port = process.env.PORT || 5001;
const { authchecker } = require("./middleware/authChecker");
const authRouter = require("./routes/auth");

const alarmRouter = require("./routes/alarm");
const userRouter = require("./routes/user");
const walletRouter = require("./routes/wallet");
const shareRouter = require("./routes/share");
const {
  schuduleDateControll,
  scheduleAlarmRegister,
  scheduleAlarmDelete,
} = require("./utils/scheduler");

const socketIo = require("socket.io");
app.use(cookieParser()); // 미들웨어

// app.use(express.urlencoded({ extended: false })); //미들웨어
app.use(express.json()); //미들웨어

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// app.use('/', function (req, res) {
//   console.log(req.body,'main');
// });

//routes

// io.on("connection",(socket) =>{
//사용자가 웹사이트에 접속하면 자동으로  발생하는 이벤트 connection
//   console.log(socket,"새로운 소켓 연결")

//   socket.on("connect",()=>{
//     console.log(socket.id)
//   })
// })

app.use(authchecker);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/wallet", walletRouter);
app.use("/alarm", alarmRouter);
app.use("/share", shareRouter);

app.listen(Port, () => {
  schuduleDateControll;
  scheduleAlarmDelete;
  console.log(`Server is Startin on ${Port}`);
});
