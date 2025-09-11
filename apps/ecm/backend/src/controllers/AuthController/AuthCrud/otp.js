const { Otp } = require('@/models/otp');
const { User } = require('@/models/User');
const { validationResult } = require('express-validator');
const { sendMail } = require('@/utils/mailer');
const {oneMinuteExpiry, fiveMinuteExpiry} = require('@/utils/otpValidate')

const generateRandom5digit = () => Math.floor(10000 + Math.random() * 90000);

const sendOtp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, msg: "Email doesn't exist!" });
    }

    if (user.isVerified) {
      return res.status(409).json({ success: false, msg: `${email} is already verified!` });
    }

    // Check if the OTP can be sent again after 1 minute
    const oldOtpData = await Otp.findOne({ user_id: user._id });
    if (oldOtpData) {
      const sendNextOtp = await oneMinuteExpiry(oldOtpData.timestamp);
      if (!sendNextOtp) {
        return res.status(400).json({
          success: false,
          message: 'Please try after some time!'
        });
      }
    }

    const otpValue = generateRandom5digit();
    const currentDate = new Date();

    // Update or insert new OTP data
    await Otp.findOneAndUpdate(
      { user_id: user._id },
      { otp: otpValue, timestamp: currentDate }, // Set timestamp to now
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const msg = `<p>Hi <b>${user.fullname}</b>,</p>
                 <p>Your OTP is <b>${otpValue}</b>. It expires in 15 minutes.</p>`;

    await sendMail(user.email, "OTP Verification", msg);

    const { password, ...userWithoutPassword } = user.toObject();
    return res.status(201).json({
      success: true,
      msg: "OTP sent to your email",
      data: userWithoutPassword
    });

  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({ success: false, msg: error.message });
  }
};






const verifyOtp = async (req, res) => {
  try {
    // Pass req here!
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array(),
      });
    }

    const { user_id, otp } = req.body;

    const otpData = await Otp.findOne({
      user_id,
      otp,
    });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: 'You entered wrong OTP!',
      });
    }

    const isOtpExpired = await fiveMinuteExpiry(otpData.timestamp);

    if (isOtpExpired) {
      return res.status(400).json({
        success: false,
        message: 'Your OTP has expired!',
      });
    }

    await User.findOneAndUpdate(
      { _id: user_id },
      {
        $set: {
          isVerified: true,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Your account has been verified successfully!',
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { sendOtp, verifyOtp };
