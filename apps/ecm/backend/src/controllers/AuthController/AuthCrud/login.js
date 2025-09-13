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


// Generate Refresh Token
const generateRefreshToken = (user) => {
  const tokenPayload = {
    _id: user._id,
   
  };

  return jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "48h" });
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

  



    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email or username",
      });
    }

    

    if (!userData.password) {
      return res.status(500).json({
        success: false,
        message: "User does not have a password stored",
      });
    }

    // Compare the password with the stored hash
    const passwordMatch = await bcrypt.compare(password, userData.password);
  

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }


   

    // 5️⃣ Optional: Check if user is verified
    if (!userData.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email first!",
      });
    }

    // 6️⃣ Generate token
    const accessToken = generateAccessToken(userData);


    // Generate Refresh Token 
    
    const refreshToken = generateRefreshToken(userData)
  

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
      refreshToken,
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


const refreshToken = async (req,res) => {
  try{
const userId = req.user._id;


const userData =  await User.findOne({_id:userId});

const accessToken = await generateAccessToken({user: userData});
const refreshToken = await generateRefreshToken({user: userData});

return res.status(200).json({
  success: true,
  msg:'Token Refreshed!',
  accessToken:accessToken,
  refreshToken:refreshToken
})

console.log('refreshtoken:', userData)
  }catch(error){
    console.log('Refresh token received');

    return res.status(500).json({
      success:false,
      message:error.message,

    })
  }
}


module.exports = { loginUser, refreshToken };
