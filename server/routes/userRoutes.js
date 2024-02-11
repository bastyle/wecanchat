const {
    login,
    register,
    getAllUsers,
    getUser,
    logOut,
  } = require("../controller/userController");
  
  const router = require("express").Router();
  
  router.post("/login", login);
  router.post("/register", register);
  router.get("/allusers", getAllUsers);
  router.get("/user/:id", getUser);
  router.get("/logout/:id", logOut);
  
  module.exports = router;