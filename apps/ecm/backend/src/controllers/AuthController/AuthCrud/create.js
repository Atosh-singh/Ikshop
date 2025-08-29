// controllers/AuthController/AuthCrud/create.js
const { User } = require('@/models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');  // To generate slugs from fullname

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { fullname, username, email, phone, password, role, isAdmin, enabled, mobile_access } = req.body;

    // Generate slug from fullname
    const slug = slugify(fullname, { lower: true, strict: true });

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phone }]
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email, username, or phone"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle image upload if provided
    let imagePath = null;
    if (req.file) {
      imagePath = 'images/' + req.file.filename; // Save the image file path
    }

    // Create new user
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
      slug,  // Save the slug field
      photo: imagePath,  // Store the image path or null if no file is uploaded
    });

    const savedUser = await newUser.save();

    // Do not return password in response
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




// controllers/AuthController/AuthCrud/create.js

const userRegister = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { fullname, username, email, password, phone } = req.body;

    // Check if user exists
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle image upload if provided
    let imagePath = null;
    if (req.file) {
      imagePath = 'images/' + req.file.filename;  // Assign the image path if file is uploaded
    }

    // Create new user
    const newUser = new User({
      fullname,
      username,
      email,
      phone,
      password: hashedPassword,
      photo: imagePath,  // Store the image path or null if no file is uploaded
    });

    // Save user
    const savedUser = await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: savedUser,
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { createUser, userRegister };

