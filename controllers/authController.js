const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register New admin and staff
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    // Password convert to encrypt 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User Created Successfully!" });
  } catch (err) {
    res.status(500).json({ error: "User registration failed" });
  }
};

// Login 
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

    // Create Token
    const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });

    res.json({ token, role: user.role, username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};