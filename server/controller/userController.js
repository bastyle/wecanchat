const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const EmailSender = require("../utils/emailSender");
const { ObjectId } = require('mongoose').Types;
const jwt = require('jsonwebtoken')

module.exports.loginOri = async (req, res, next) => {
  try {
    console.log("login endpoint...")
    const { username, password } = req.body;
    console.log("username: " + username + "pass" + password)
    const userAux = await User.findOne({ username });
    if (!userAux) {
      console.log("Incorrect Username or Password 1")
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, userAux.password);
    if (!isPasswordValid) {
      console.log("Incorrect Password")
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    const user = await User.findOne({ username }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
      "profileId"
    ]);
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res) => {
  try {
      const { username, password } = req.body;
      console.log('logging in...'+ username, password)
      const userAux = await User.findOne({ username });

      if(!userAux){
          //return res.status(404).json({ message: 'User not found!' });
          return res.json({ msg: "Incorrect Username or Password", status: false });
      }

      if (!userAux || !bcrypt.compareSync(password, userAux.password)) {
          //return res.status(401).json({ message: 'Invalid credentials' });
          return res.json({ msg: "Incorrect Username or Password", status: false });
      }

      const token = jwt.sign({ userId: userAux._id, profile: userAux.profileId }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
      const user = await User.findOne({ username }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
        "profileId"
      ]);
      //res.json({ token });
      //res.status(201).json({user: user.userId})
      return res.json({ status: true, user, token: token });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error logging in' });
  }
}



module.exports.register = async (req, res, next) => {
  console.log("register endpoint...")
  try {
    const { username, email, password, avatarImage } = req.body;
    console.log("avatarImage: " + avatarImage);
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.status(200).json({ msg: "username or email already exists", status: false });
    //return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      //return res.json({ msg: "Email already used", status: false });
      return res.status(200).json({ msg: "username or email already exists", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      avatarImage
    });

    // send welcome email
    const emailSender = new EmailSender();
    await emailSender.sendWelcomeEmail(user.email, user.username);
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    console.log("logout endpoint...")
    if (!req.params.id) return res.json({ msg: "User id is required " });
    //onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers1 = async (req, res, next) => {
  try {
    console.log(req.params.id)
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "_id",
      "profileId", // 0 regular user, 1 admin
      "email",
      "username",
      "avatarImage",

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
        "firstName",
        "lastName",
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
  console.log("getAllUsers...")
  try {
    const userId = req.params.id;
    const users = await User.find().select([
      "_id",
      "profileId", // 0 regular user, 1 admin
      "email",
      "username",
      "avatarImage",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsersById = async (req, res, next) => {
  console.log("getAllUsers (by id)...")
  try {
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

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.updUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, currentPassword, newPassword, avatarImage, _id } = req.body;

    if (!ObjectId.isValid(_id)) {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }
    
    const userAux = await User.findById(new ObjectId(_id)).select([
      "email",
      "username",
      "avatarImage",
      "password",
      "_id",
    ]);

    //console.log("user??: " + userAux)
    if (!userAux) {
      return res.json({ msg: "Incorrect Not Found!", status: false });
    }
    if (!newPassword || newPassword === "") {
      console.log("No Password");
      const user = await User.findByIdAndUpdate(
        _id,
        {
          firstName,
          lastName,
          email,
          avatarImage,
        },
        { new: true }
      );
      return res.json({ msg: "User Update successfully!", status: true });
    } else {
      const isPasswordValid = await bcrypt.compare(currentPassword, userAux.password);
      if (!isPasswordValid) {
        console.log("Incorrect Password")
        return res.json({ msg: "Current Password Invalid!", status: false });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const user = await User.findByIdAndUpdate(
        _id,
        {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          avatarImage,
        },
        { new: true }
      );
      return res.json({ msg: "User Update successfully!", status: true });
    }
  } catch (ex) {
    next(ex);
  }
}