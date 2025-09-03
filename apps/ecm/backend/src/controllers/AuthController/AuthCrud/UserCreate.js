const { User } = require("@/models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
const { sendMail } = require("../../../utils/mailer");

// Helper to generate verification email link
const getVerificationLink = (userId) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:5001";  // Your base URL
  return `${baseUrl}/api/users/mail-verification?queryid=${userId}`;  // Correct query string
};

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      fullname,
      username,
      email,
      phone,
      password,
      role,
      isAdmin,
      enabled,
      mobile_access,
    } = req.body;

    const slug = slugify(fullname, { lower: true, strict: true });

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email, username, or phone",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Image path
    const imagePath = req.file ? "images/" + req.file.filename : null;

    // Create user
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
      slug,
      photo: imagePath,
    });

    const savedUser = await newUser.save();

    // Send verification email
    const msg = `
      <p>Hi ${fullname},</p>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${getVerificationLink(savedUser._id)}">Verify Your Email</a>
    `;
    await sendMail(email, "Email Verification", msg);

    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    return res.status(201).json({
      success: true,
      message: "User created successfully. Verification email sent.",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


// mail verification
const mailVerification = async (req, res) => {
  try {
    const { queryid } = req.query;

    if (!queryid) {
      return res.render('404', { title: '404 Not Found' }); // Return 404 if queryid is not provided
    }

    const user = await User.findById(queryid); // Look for the user by ID

    if (!user) {
      return res.render('mail-verification', { message: 'User not found' }); // If user not found, show error
    }

    if (user.isVerified) {
      return res.render('mail-verification', { message: 'Email already verified' }); // If email already verified
    }

    user.isVerified = true; // Mark the user as verified
    await user.save(); // Save the updated user 

    // Render the success message on the same page
    return res.render('mail-verification', { message: 'Email verified successfully' }); // Show success message

  } catch (error) {
    console.error(error.message);
    return res.render('404', { title: '404 Not Found' }); // Render 404 on error
  }
};


// Resend verification email
const sendMailVerification = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation errors",
        errors: errors.array(),
      });
    }

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Email does not exist!",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        msg: `${email} is already verified!`,
      });
    }

    const msg = `
      <p>Hi ${user.fullname},</p>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${getVerificationLink(user._id)}">Verify Your Email</a>
    `;

    await sendMail(user.email, "Email Verification", msg);

    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.status(201).json({
      success: true,
      message: "Verification link sent to your email. Please check.",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};



module.exports = {
  createUser,
  mailVerification,
  sendMailVerification,

};
