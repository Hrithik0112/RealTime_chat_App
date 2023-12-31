import { useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import Chat from "./Chat";

const socket = io("http://localhost:3001/");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
    setShowChat(true);
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h1>Join A Room</h1>
          <input
            type="text"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="RoomId.."
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join ROOM</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
