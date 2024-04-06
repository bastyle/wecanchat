const {
    login,
    register,
    getAllUsers,
    getUser,
    logOut,
    setAvatar,
    getAllUsersById,
    updUser,
    deleteUser,
  } = require("../controller/userController");
const auth = require("../middleware/auth");
  
  const router = require("express").Router();
  
  router.post("/login", login);
  router.post("/register", register);
  router.get("/allusers", auth, getAllUsers);
  router.get("/allusers/:id", auth, getAllUsersById);
  router.get("/user/:id", auth, getUser);
  router.put("/user/:id", auth, updUser);
  router.get("/logout/:id", logOut);
  router.post("/setavatar/:id", setAvatar);
  router.delete("/user/:id", auth, deleteUser);
  
  module.exports = router;