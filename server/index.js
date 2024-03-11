const express = require('express')
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
app.use(cors())
app.use(express.json())

// DB Connection
console.log('Connecting to MongoDB Atlas...');
mongoose.connect(process.env.MONGODB_URL,{
  useNewUrlParser : true ,
  useUnifiedTopology : true
}).then(()=>{
  console.log('connected to mongoDB atlas instance.');
  // adding test user
  /*const userTest = new UserModel({username:'Bastian', email:'admin@admin.com',password:'admin2024'})
  userTest.save().then(doc => {
      //console.log('user test (admin) saved:', doc);
      console.log('user test (admin) saved:');
    })
    .catch(error => {
      console.error('Error saving user:', error);
    });*/
});

// Socket setup



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
const io = socketManager.setupSocket(server);