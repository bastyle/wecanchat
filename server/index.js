const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors")
require('dotenv').config()
const { default: mongoose } = require('mongoose')
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRouter");
const avatarRoutes = require("./routes/avatarRoutes");
const announcementRoutes = require("./routes/announcementRouter");
//const UserModel = require('./model/userModel')
//const socketManager = require("./manager/socketManager");


const app = express()
//app.use(express.json())
// socket setup
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
//const io = socketIo(server);

const io = new socketIo.Server(server, {
  cors: {
    // origin: process.env.SOCKET_ORI,
    origin: '*',
    credentials: true,
  },
});
// socket setup

app.use(cors())



//app.use(express.json({ limit: '10mb' }));
//app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
console.log('limit:::::::', express.json().limit);
console.log('limit:::::::', express.urlencoded().limit);

// DB Connection
console.log('Connecting to MongoDB Atlas...');
mongoose.connect(process.env.MONGODB_URL,{
  useNewUrlParser : true ,
  useUnifiedTopology : true
}).then(()=>{
  console.log('connected to mongoDB atlas instance.');
});


//test endpoint 
app.get("/api/health", (req, res) => {
    console.log("health endpoint...")
    res.json({ "msg": "OK" })
  })

app.use("/api/auth", userRoutes);  
app.use("/api/messages", messageRoutes);
app.use("/api/avatar", avatarRoutes);
app.use("/api/announcement", announcementRoutes);



/*const server = app.listen(process.env.PORT, () =>
  console.log("server started on port: " + process.env.PORT + " ...")
);*/

// Socket setup
// Keep track of connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('New client connected');
  

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

// end socket setup

server.listen(process.env.PORT, () => {
  console.log("server started on port: " + process.env.PORT + " ...")
});

// Socket setup
//const io = socketManager.setupSocket(server);