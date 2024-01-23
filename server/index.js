const express = require('express')
const cors = require("cors")
require('dotenv').config()


const app = express()
app.use(cors())
app.use(express.json())


//test endpoint 
app.get("/api/health", (req, res) => {
    console.log("health endpoint...")
    res.json({ "msg": "OK" })
  })

const server = app.listen(process.env.PORT, () =>
  console.log("server started on port: " + process.env.PORT + " ...")
);