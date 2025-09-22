// models/Role.js
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    removed: {
      type: Boolean,
      default: false,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
      unique: true, // e.g., "admin", "seller", "customer"
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    actions: [
      {
        type: String,
        enum: ["read", "write", "create", "update", "delete", "remove"],
        default: "read",
      },
    ],
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        required: true,
      },
    ],

    slug: {
      type: String,
      unique: true, // Ensure that the slug is unique
      trim: true,
    },
  },
  { timestamps: true }
);

// Index for faster role lookups

roleSchema.index({ removed: 1, enabled: 1 });

const Role = mongoose.model("Role", roleSchema);
module.exports = { Role };
