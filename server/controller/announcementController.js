const Announcements = require("../model/announcementModel");
const { ObjectId } = require('mongoose').Types;

module.exports.getAllAnnouncements = async (req, res, next) => {
    try {
        //console.log(req.params.id)
        const anns = await Announcements.find().select([
            "title",
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
        console.log(req.body);
        
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

module.exports.getById = async (req, res, next) => {
    try {
      const annId = req.params.id;
      //console.log(annId);
      if (annId) {
        if (!ObjectId.isValid(annId)) {
          return res.status(400).json({ msg: 'Invalid announcement ID' });
        }
        const ann = await Announcements.findById(new ObjectId(annId)).select([
            "title",
            "content",
            "createdDate",
            "image",
            "author",
            "_id",
        ]);
  
        if (!ann) {
          return res.status(404).json({ msg: 'Announcement not found' });
        }
  
        return res.json(ann);
      }
    } catch (ex) {
      next(ex);
    }
  };