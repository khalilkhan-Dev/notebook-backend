const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const model = require("../models/Authmodel");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await model.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new model({ username, email, password: hashedPassword });
    await user.save();

    // Generate the JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, "khalil", { expiresIn: "1h" });

    // Return the token in a JSON object
    res.status(201).json({ token });
  } catch (error) {
    console.log("error is:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await model.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // generating jwt for login
    const payload = { userId: user._id };
    const token = jwt.sign(payload, "khalil", { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
