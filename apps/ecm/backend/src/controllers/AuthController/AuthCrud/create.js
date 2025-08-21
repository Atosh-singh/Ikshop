// controllers/AuthController/AuthCrud/create.js
const { User } = require('@/models/User');
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { fullname, username, email, phone, password, role, isAdmin, enabled, mobile_access } = req.body;

    // Password strength check
    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phone }]
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email, username or phone"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      username,
      email,
      phone,
      password: hashedPassword,
      role,
      isAdmin: isAdmin ?? false,
      enabled: enabled ?? true,
      mobile_access: mobile_access ?? false,
    });

    const savedUser = await newUser.save();

    // 🔴 password response me na bheje
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userWithoutPassword,
    });

  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = createUser;
