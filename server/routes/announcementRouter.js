const { 
    addAnnouncement, getAllAnnouncements ,getById
} = require("../controller/announcementController");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/", auth, addAnnouncement);
router.get("/", getAllAnnouncements);
router.get("/:id", getById);

module.exports = router;