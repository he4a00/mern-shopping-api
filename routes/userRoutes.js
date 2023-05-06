const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
  addUser,
} = require("../controllers/userControllers");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// Register New User

router.post("/register", registerUser);
router.post("/add", verifyTokenAndAdmin, addUser);

// Login User

router.post("/login", loginUser);

// update user

router.put("/:id", verifyTokenAndAuthorization, updateUser);

// delete user
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

// get single user

router.get("/:id", verifyTokenAndAdmin, getSingleUser);

// get all users

router.get("/", verifyTokenAndAdmin, getAllUsers);

module.exports = router;
