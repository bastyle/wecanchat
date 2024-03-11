const { 
    addAvatar, getAllAvatars 
} = require("../controller/avatarController");

const router = require("express").Router();

router.post("/", addAvatar);
router.get("/", getAllAvatars);
//router.get("/:id", getById);

module.exports = router;