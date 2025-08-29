// controllers/AuthController/AuthCrud/pagination.js
const { User } = require('@/models/User');
const paginate = require('@/utils/paginate');  // Import the paginate helper

const paginateUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const filter = { removed: false };  // Filter condition to exclude removed users
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      select: '-password -otp -otpCreatedAt',  // Exclude sensitive fields
      populate: ['role', 'addresses'],
      sort: { createdAt: -1 },  // Sort by creation date (descending)
    };

    const result = await paginate(User, filter, options);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error paginating users:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = paginateUsers;
