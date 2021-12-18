import type { NextPage } from "next";
import { useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";

const Index: NextPage = () => {
  const [socket, setSocket] = useState<Socket>();
  const [message, setMessage] = useState("");
  const [pushMessage, setPushMessage] = useState("");

  useEffect(() => {
    const socket = socketIOClient("http://localhost:3001");
    socket.on("broadcast", (message) => {
      setPushMessage(message);
      setTimeout(() => {
        setPushMessage("");
      }, 5000);
    });
    setSocket(socket);
  }, []);

  const sendMessage = () => {
    if (!socket) return;
    socket.emit("set_message", message);
  };

  return (
    <div>
      <p>{pushMessage}</p>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button onClick={sendMessage}>メッセージを送信</button>
    </div>
  );
};

export default Index;
