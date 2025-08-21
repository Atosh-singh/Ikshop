// models/User.js
const mongoose = require('mongoose');
const Address= require("./Address")

const userSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false
  },

  enabled: {
    type: Boolean,
    default: true
  },

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
      message: 'Invalid email format',
    },
  },

  password: {
    type: String,
    required: true,
     select: false,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: null,
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',

  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address'
    }
  ],

  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],

  isActive: {
    type: Boolean,
    default: true
  },
  otp: {
    type: Number,
    default: null,
  },
  otpCreatedAt: {
    type: Date,
  },
  mobile_access: {
    type: Boolean,
    default: false,
  },
  lastSeen: {
    type: Date,
  },
  fcmToken: {
    type: String,
    default: null
  },
  lastActivityAt: {
    type: Date,
    default: Date.now,
    select: false,
  },

}, {
  timestamps: true
}
);

userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

module.exports = {User};