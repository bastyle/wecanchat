const mongoose = require("mongoose");

const AnnouncementSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1,
        max: 100,
        unique: true,
      },
      content: {
        type: String,
        required: true,
        min: 1,
        max: 1000,
        unique: false,
      },
      image: {
        type: String,
        required: false,
        min: 1,
        unique: false,
      }
    }
);

module.exports = mongoose.model("Announcement", AnnouncementSchema);