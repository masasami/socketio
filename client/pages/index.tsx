import type { NextPage } from "next";
import { useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";

const Index: NextPage = () => {
  const [socket, setSocket] = useState<Socket>();
  const [message, setMessage] = useState("");
  const [emitMessage, setEmitMessage] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [allMessage, setAllMessage] = useState("");

  useEffect(() => {
    const socket = socketIOClient("http://localhost:3001");

    socket.on("emit", (message) => {
      setEmitMessage(message);
    });
    socket.on("broadcast", (message) => {
      setBroadcastMessage(message);
    });
    socket.on("all", (message) => {
      setAllMessage(message);
    });

    setSocket(socket);
  }, []);

  const sendMessage = () => {
    if (!socket) return;
    socket.emit("set_message", message);
  };

  return (
    <div>
      <p>{emitMessage}</p>
      <p>{broadcastMessage}</p>
      <p>{allMessage}</p>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button onClick={sendMessage}>メッセージを送信</button>
    </div>
  );
};

export default Index;
