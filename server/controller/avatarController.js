const Avatars = require("../model/avatarModel");

module.exports.getAllAvatars = async (req, res, next) => {
    try {
      console.log(req.params.id)
      const avatars = await Avatars.find().select([
        "source",
        "_id",
      ]);
      return res.json(avatars);
    } catch (ex) {
      next(ex);
    }
  };

  module.exports.addAvatar = async (req, res, next) => {
    try {
      const { source } = req.body;
      const data = await Avatars.create({
        source
      });
        if (data) return res.json({ msg: "Avatar added successfully." });
      else return res.json({ msg: "Failed to add Avatar to the database" });
    } catch (ex) {
      next(ex);
    }
  };