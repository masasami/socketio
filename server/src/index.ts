import express, { Request, Response } from "express";
import http from "http";
import Socketio, { Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Socketio.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("接続しました！");
  console.log("ソケットID：" + socket.id);

  socket.on("set_message", (message) => {
    console.log("メッセージをセット！");
    console.log(message);
    socket.broadcast.emit("broadcast", "新着メッセージがあります");
  });

  socket.on("disconnect", () => {
    console.log("切断されました！");
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "サーバー起動中" });
});

server.listen(3001, () => {
  console.log("サーバー起動中");
});
