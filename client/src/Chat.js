import React, { useMemo, useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [currentMsg, setCurrentMsg] = useState();

  const sendMsg = async () => {
    if (currentMsg !== "") {
      const msgData = {
        room: room,
        author: username,
        messege: currentMsg,
        time: new Date().toLocaleTimeString(),
      };
      await socket.emit("send_msg", msgData);
    }
  };

  useMemo(() => {
    socket.on("recieve_msg", (data) => {
      console.log(data);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input placeholder="Type your text.." onChange={(e) => setCurrentMsg(e.target.value)} />
        <button onClick={sendMsg}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
