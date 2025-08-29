const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    // Reference to the customer (User who placed the order)
customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
},

// Reference to the shop (from where the order was made)
shop:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Shop",
    required: true,
},
 slug: {
    type: String,
    unique: true,  // Ensure that the slug is unique
    trim: true,
  },

// Array of products in the order
products: [
    {
        // Reference to the Product model (the product ordered)
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",

        },

         // Quantity of the product ordered
           quantity: { 
        type: Number, 
        default: 1 
      },

      // Price of the product at the time of purchase
        priceAtPurchase: { 
        type: Number, 
        required: true 
      }
    }
],

// Total amount for the order (sum of all product prices)

  totalAmount: { 
    type: Number, 
    required: true 
  },

  // Current status of the order (pending, paid, shipped, delivered, cancelled)
  status:{
    type: String,
    enum:['pending','paid','shipped', 'delivered', 'cancelled'],
    default:'pending',
  },

  // Shipping address (where the order will be delivered)
  shippingAddress:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Address'
  },

  // Payment method used (e.g., credit card, PayPal, etc.)
   paymentMethod: { 
    type: String 
  },

   // Payment status (pending, completed, failed)
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  }
}, { timestamps: true });

const Order = mongoose.model("Order",orderSchema);

module.exports= {Order};