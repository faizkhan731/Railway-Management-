const jwt = require("jsonwebtoken");

const User = require("../models/userModels");

const Secret_key = "faizkhan";

// REGISTER
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      gender,
      role,
    } = req.body;

    // CHECK USER
    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password,
      phone,
      gender,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered",
      user,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // FIND USER
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // PASSWORD CHECK
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      Secret_key,
      {
        expiresIn: "2h",
      }
    );

    // COOKIE
    // res.cookie("authToken", token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   maxAge: 1000 * 60 * 60 * 2,
    // });
    res.cookie("authToken", token, {
  httpOnly: true,
  secure: true,       // ← HTTPS ke liye
  sameSite: "none",   // ← cross-origin ke liye
  maxAge: 1000 * 60 * 60 * 2,
});

    res.json({
      success: true,
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET ME
const getMe = async (req, res) => {
  try {

    const user = await User.findById(
      req.user.id
    ).select("-password");

    res.json({
      success: true,
      user,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};