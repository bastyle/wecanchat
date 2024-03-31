const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors")
require('dotenv').config()
const { default: mongoose } = require('mongoose')
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRouter");
const avatarRoutes = require("./routes/avatarRoutes");
const announcementRoutes = require("./routes/announcementRouter");
const { setupSocket } = require('./manager/socketManager');


const app = express()
const http = require('http');
const server = http.createServer(app);
const io = setupSocket(server);
app.use(cors())

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());

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

server.listen(process.env.PORT, () => {
  console.log("server started on port: " + process.env.PORT + " ...")
});

module.exports = app; // Export the app for testing