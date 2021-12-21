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
    socket.emit("emit", "メッセージを送信しました"); // 本人にemit
    socket.broadcast.emit("broadcast", "新着メッセージがあります"); // 本人以外の全員にemit
    io.emit("all", "全員"); // 全員にemit
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
