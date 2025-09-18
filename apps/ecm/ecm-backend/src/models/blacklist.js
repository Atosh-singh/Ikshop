const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    blacklistedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Blacklisted = mongoose.model("Blacklisted", BlacklistSchema);

module.exports = { Blacklisted };
