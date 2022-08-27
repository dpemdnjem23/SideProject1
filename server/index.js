const express = require("express");


const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express()
const Port =process.env.PORT|| 5001;
const {authchecker} = require('./middleware/authChecker');
const authRouter = require('./routes/auth')
require("dotenv").config();

const userRouter = require('./routes/user');
const walletRouter = require('./routes/wallet');
const schuduleDateControll = require("./utils/scheduler");

const socketIo = require('socket.io')


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


// io.on("connection",(socket) =>{
  //사용자가 웹사이트에 접속하면 자동으로  발생하는 이벤트 connection
//   console.log(socket,"새로운 소켓 연결")

//   socket.on("connect",()=>{
//     console.log(socket.id)
//   })
// })



app.use(authchecker)

app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/wallet',walletRouter)



// app.get("/", (req, res) => {
//   res.send("Hello Nodes.js");
// });
const io = socketIo(
app.listen(Port, () => {
  schuduleDateControll
  console.log(`Server is Startin on ${Port}`);
})
,{path: '/socket.io'})


//* 웹소켓 연결 시
io.on('connection', (socket) => {
   console.log('연결되었음')
 
  //* 연결 종료 시
  socket.on('disconnect', () => {
     console.log('클라이언트 접속 해제', socket.id);
     clearInterval(socket.interval);
  });


//* 에러 시
socket.on('error', (error) => {
  console.error(error);
});

//* 클라이언트로부터 메시지 수신
socket.on('reply', (data) => { // reply라는 이벤트로 송신오면 메세지가 data인수에 담김
  console.log(data);
});

//* 클라이언트로 메세지 송신
socket.emit('news', 'Hello Socket.IO'); // news라는 이벤트로 문자열을 포함하여 송신
});

