const mongoose = require("mongoose");

const AvatarSchema = mongoose.Schema({
    source: {
        type: String,
        required: true,
        min: 1,
        unique: true,
      }
    }
);

module.exports = mongoose.model("Avatar", AvatarSchema);