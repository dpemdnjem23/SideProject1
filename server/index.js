const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const Port = 5000;

app.use(express.json()); //미들웨어
app.use(express.urlencoded({ extended: false })); //미들웨어
app.use(cookieParser()); // 미들웨어

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello Nodes.js");
});

app.listen(Port, () => {
  console.log(`Server is Startin on ${Port}`);
});
