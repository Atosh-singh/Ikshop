const { Product } = require("../../models/Product");

const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;  // Destructure both fields from the request body

    // Check if price is provided
    if (price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Price is required",
      });
    }

    const newProduct = new Product({
      name,
      price,
    });

    const savedProduct = await newProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product added!",
      data: savedProduct,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = { addProduct };
