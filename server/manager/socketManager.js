const socketIo = require('socket.io');

const setupSocket = (server) => {
  const io = new socketIo.Server(server, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  // Keep track of connected users
  const connectedUsers = new Map();

  io.on('connection', (socket) => {
    console.log('New client connected!!');

    // Handle new user connection
    socket.on('user_connected', (userId) => {
      console.log(`User connected with ID: ${userId}`);
      connectedUsers.set(userId, socket.id);
    });

    console.log('Connected users:', connectedUsers);
    
    // Handle direct messages
    socket.on('send_message', ({ from, to, message }) => {
      console.log(`Sending message from ${from} to ${to}: ${message}`);
      const toSocketId = connectedUsers.get(to);
      if (toSocketId) {
        io.to(toSocketId).emit('receive_message', { from, message });
      } else {
        console.log(`User with ID ${to} is not connected`);
      }
    });

    // Handle broadcast messages
    socket.on('broadcast_message', (message) => {
      io.emit('receive_broadcast', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      for (const [userId, socketId] of connectedUsers) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          console.log(`User with ID ${userId} disconnected`);
          break;
        }
      }
    });
  });

  return io;
};

module.exports = { setupSocket };
