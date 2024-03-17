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
const socketManager = require("./manager/socketManager");

const app = express()
//app.use(express.json())
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

const server = app.listen(process.env.PORT, () =>
  console.log("server started on port: " + process.env.PORT + " ...")
);
// Socket setup
const io = socketManager.setupSocket(server);