const {
    login,
    register,
    getAllUsers,
    getUser,
    logOut,
    setAvatar,
    getAllUsersById,
    updUser,
  } = require("../controller/userController");
  
  const router = require("express").Router();
  
  router.post("/login", login);
  router.post("/register", register);
  router.get("/allusers", getAllUsers);
  router.get("/allusers/:id", getAllUsersById);
  router.get("/user/:id", getUser);
  router.put("/user/:id", updUser);
  router.get("/logout/:id", logOut);
  router.post("/setavatar/:id", setAvatar);
  
  module.exports = router;