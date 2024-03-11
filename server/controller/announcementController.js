const Announcements = require("../model/announcementModel");

module.exports.getAllAnnouncements = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const anns = await Announcements.find().select([
            "title",
            "content",
            "createdDate",
            "image",
            "author",
            "_id",
        ]);
        return res.json(anns);
    } catch (ex) {
        next(ex);
    }
};

module.exports.addAnnouncement = async (req, res, next) => {
    try {
        const { title, content, image, author } = req.body;
        const data = await Announcements.create({
            title,
            content,
            image: image ? image : null,
            author
        });
        if (data) return res.json({ msg: "Announcement added successfully." });
        else return res.json({ msg: "Failed to add Announcement to the database" });
    } catch (ex) {
        next(ex);
    }
};