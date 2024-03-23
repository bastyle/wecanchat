const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: false,
    min: 2,
    max: 50,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: true,
  },
  avatarImage: {
    type: String,
    default: process.env.AVATAR_IMG,
  },
  profileId: {
    type: Number,
    required: true,
    default: 0, //0 regular user, 1 admin
  },
});

module.exports = mongoose.model("User", userSchema);