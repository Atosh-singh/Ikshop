const { User } = require("@/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Generate JWT Token
const generateAccessToken = (user) => {
  const tokenPayload = {
    _id: user._id,
   
  };

  return jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const loginUser = async (req, res) => {
  try {
    // 1️⃣ Run validators
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        msg: "Validation Errors",
      });
    }

    // 2️⃣ Ensure at least email OR username is provided and password
    const { email, username, password } = req.body;
    console.log("Password received:", password); // Added log to see what password is being passed

    if (!email && !username) {
      return res.status(400).json({
        success: false,
        msg: "Please provide email or username",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        msg: "Password is required",
      });
    }

    // 3️⃣ Find user by email OR username
    const userData = await User.findOne({
      $or: [{ email }, { username }],
    },
   { password: 1 }  // Explicitly select the password field
   ).select('password isVerified fullname email username phone isAdmin photo lastActivityAt'); // Explicitly select relevant fields

   // 4️⃣ Log the full userData object to verify what data is returned
    console.log("Fetched User Data:", userData); // This logs the complete user object


   console.log()

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email or username",
      });
    }

    // 4️⃣ Ensure password exists and compare with hashed password
    console.log("Stored password hash:", userData.password); // Log stored hashed password for comparison

    if (!userData.password) {
      return res.status(500).json({
        success: false,
        message: "User does not have a password stored",
      });
    }

    // Compare the password with the stored hash
    const passwordMatch = await bcrypt.compare(password, userData.password);
    console.log("Password match result:", passwordMatch); // Log the result of the comparison

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }


    console.log("User Verification Status:", userData.isVerified); // Log the actual value of isVerified

    // 5️⃣ Optional: Check if user is verified
    if (!userData.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email first!",
      });
    }

    // 6️⃣ Generate token
    const accessToken = generateAccessToken(userData);

    // 7️⃣ Respond with user info + token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: userData._id,
        fullname: userData.fullname,
        email: userData.email,
        username: userData.username,
        phone: userData.phone,
        isAdmin: userData.isAdmin,
        photo: userData.photo,
        lastActivityAt: userData.lastActivityAt,
      },
      accessToken,
      tokenType: "Bearer",
      expiresIn: "24h",
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};


module.exports = { loginUser };
