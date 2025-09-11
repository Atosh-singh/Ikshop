const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => Date.now() + 15 * 60 * 1000, // auto 15 min from now
      index: { expires: '15m' } 
    }
  },
  { timestamps: true }
);

const Otp = mongoose.model('Otp', otpSchema);

module.exports = { Otp };
