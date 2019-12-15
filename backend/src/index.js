const SocketIO = require("socket.io");
const uuid = require("uuid/v1");

const port = process.env.PORT || 3000;
const io = new SocketIO(port, {
  transports: ["websocket"]
});

io.on("connection", socket => {
  console.log(`New socket connected! ID: ${socket.id} - Name: ${socket.handshake.query.name}`);
  const { handshake: { query: { name } } } = socket;

  socket.emit('user', {
      _id: socket.id,
      name
  });

    io.emit("message", [
      {
        _id: uuid(),
        text: `Let's welcome ${name} for joining the chat!`,
        createdAt: new Date(),
        system: true,
      }
    ]);
    
  socket.on("message", data => {
    console.log(data);
    socket.broadcast.emit("message", data);
  });
});
