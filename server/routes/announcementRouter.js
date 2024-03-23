const { 
    addAnnouncement, getAllAnnouncements ,getById
} = require("../controller/announcementController");

const router = require("express").Router();

router.post("/", addAnnouncement);
router.get("/", getAllAnnouncements);
router.get("/:id", getById);

module.exports = router;