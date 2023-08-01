import "./App.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001/");

function App() {
  return <div className="App">Welcome Home</div>;
}

export default App;
