import React, { useMemo, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  const sendMsg = async () => {
    if (currentMsg !== "") {
      const msgData = {
        room: room,
        author: username,
        messege: currentMsg,
        time: new Date().toLocaleTimeString(),
      };
      await socket.emit("send_msg", msgData);
      setMsgList((list) => [...list, msgData]);
      setCurrentMsg("");
    }
  };

  useMemo(() => {
    socket.on("recieve_msg", (data) => {
      setMsgList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="messege-container">
          {msgList.map((msgContent, index) => {
            return (
              <div
                className="message"
                id={username === msgContent.author ? "you" : "other"}
                key={index}
              >
                <div>
                  <div className="message-content">
                    <p>{msgContent.messege}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{msgContent.time}</p>
                    <p id="author">{msgContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          placeholder="Type your text.."
          value={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button onClick={sendMsg}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
