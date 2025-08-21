// models/Role.js
const mongoose = require('mongoose');


const roleSchema = new mongoose.Schema({
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
    trim: true
  },
  description: {
    type: String,
    trim: true
  },

      actions: [
      {
        type: String,
        enum: [
          'read',
          'write',
          'create',
          'update',
          'delete',
          'schedule',
          'follow_up',
          'sms',
          'whatsapp',
          'email',
          'export',
          'import',
          'call',
          
      
        ],
        default: 'read',
      }
    ],
  permissions: [
    {
      type: String,
      enum: [
        // Product permissions
        'product:create',
        'product:read',
        'product:update',
        'product:delete',

        // Order permissions
        'order:create',
        'order:read',
        'order:update',
        'order:delete',

        // User permissions
        'user:read',
        'user:update',
        'user:delete',

        // Category permissions
        'category:create',
        'category:read',
        'category:update',
        'category:delete',

        // Other
        'analytics:read',
        'settings:update'
      ]
    }
  ]
}, { timestamps: true });

// Index for faster role lookups

roleSchema.index({ removed: 1, enabled: 1 });


const Role = mongoose.model('Role', roleSchema);
module.exports ={Role};