const mongoose = require("mongoose");

const AnnouncementSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 1,
    max: 100,
    unique: false,
  },
  content: {
    type: String,
    required: true,
    min: 1,
    max: 1000,
    unique: false,
  },
  author:{
    type: String,
    required: true,
    min: 3,
    max: 100,
    unique: false,
  },
  image: {
    type: String,
    required: false,
    min: 1,
    unique: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);