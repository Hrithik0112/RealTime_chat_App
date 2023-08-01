const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Update the origin to allow requests from http://localhost:3000
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected : ${socket.id}`);
  console.log("i am here");

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with id : ${socket.id} joined the room :${data}`);
  });

  socket.on("send_msg", (data) => {
    socket.to(data.room).emit("recieve_msg", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
