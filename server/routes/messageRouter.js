const { 
    addMessage, getMessages 
} = require("../controller/messageController");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/addmsg/", auth, addMessage);
router.post("/getmsg/", auth, getMessages);

module.exports = router;