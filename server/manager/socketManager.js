const { Server } = require('socket.io');

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      // origin: process.env.SOCKET_ORI,
      origin: '*',
      credentials: true,
    },
  });

  global.onlineUsers = new Map();

  io.on('connection', (socket) => {
    global.chatSocket = socket;

    socket.on('add-user', (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log("add-user:: " + userId)
    });

    socket.on('send-msg', (data) => {
      console.log("send-msg:: " + JSON.stringify(data));
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit('msg-recieve', data.msg);
        console.log("msg-recieve:: " + data.msg);
      }
    });
  });

  return io;
};

module.exports = { setupSocket };
