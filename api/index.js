const http = require("http");
const app = require("./app");
const cors = require("cors");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["Get", "Post"],
  },
});
app.use(cors());
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
app.use("/peerjs", peerServer);
const PORT = 5000;

// Name Space Of Socket.io For Video Related Logic
//const meetNameSpace = io.of("/meet");

io.on("connection", (socket) => {
  console.log(`user connected to meet namespacewith id ${socket.id}`); // User Connected

  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);
    console.log(`${userId} joined room: ${roomId}`);
    socket.on("send-message", (msg, user, time) => {
      io.to(roomId).emit("receive-message", msg, user, time);
    });
  });

  // User Disconnected
  socket.on("disconnect", () => {
    console.log("user disconnected from meet with id: ", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("Server Is Running On Port: ", PORT);
});
