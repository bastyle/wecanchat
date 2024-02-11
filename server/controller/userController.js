const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const EmailSender = require("../utils/emailSender");
const { ObjectId } = require('mongoose').Types;

module.exports.login = async (req, res, next) => {
  try {
    console.log("login endpoint...")
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log("user??: " + user)
    if (!user) {
      console.log("Incorrect Username or Password 1")
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Incorrect Password")
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    console.log(user)
    delete user.password;
    let { ['password']: _, ...refUser } = user;
    console.log(refUser)
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};


module.exports.register = async (req, res, next) => {
  console.log("register endpoint...")
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    // send welcome email
    const emailSender = new EmailSender();
    await emailSender.sendWelcomeEmail(user.email, user.username);

    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers1 = async (req, res, next) => {
  try {
    console.log(req.params.id)
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};


module.exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    // Check if an ID is provided in the URL
    if (userId) {
      // If ID is provided, return only the user with that ID
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ msg: 'Invalid user ID' });
      }
      const user = await User.findById(new ObjectId(userId)).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      return res.json(user);
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    // If no ID is provided, return all users
    const users = await User.find().select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};