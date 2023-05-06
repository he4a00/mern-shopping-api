const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register function

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "Username Already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, password: hash });
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(400).send(error);
  }
};

// login function

const loginUser = async (req, res) => {
  const { username, password } = req.body; // add `password` here
  try {
    const user = await User.findOne({ username });

    const passOk = await bcrypt.compare(password, user.password); // await added

    if (passOk) {
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "3d" }
      );

      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken });
    } else {
      res.status(401).json({ message: "Invalid username or password" }); // error message added
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

// add user from admin panel

const addUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "Username Already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, password: hash });
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(400).send(error);
  }
};

// update user function

const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatesUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatesUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

// delete user function

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

// get single user function

const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.find(id);
    const { password, ...others } = user._doc;
    res.status(200).json(...others);
  } catch (error) {
    res.status(400).json(error);
  }
};

// get all users function

const getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
  addUser,
};
