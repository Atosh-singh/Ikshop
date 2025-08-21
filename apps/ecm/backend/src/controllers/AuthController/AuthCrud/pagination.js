// controllers/AuthController/AuthCrud/pagination.js
const { User } = require('@/models/User');


const paginateUsers = async (req, res) => {
  try {
  const { page = 1, limit = 10 } = req.query;
const skip = (page - 1) * limit;

const [users, total] = await Promise.all([
  User.find({ removed: false })
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .populate('role', 'name permissions')
    .populate('addresses')
    .select('-password -otp -otpCreatedAt'),
  User.countDocuments({ removed: false })
]);

return res.status(200).json({
  success: true,
  page: parseInt(page),
  limit: parseInt(limit),
  totalPages: Math.ceil(total / limit),
  totalUsers: total,
  hasPrevPage: page > 1,
  hasNextPage: page * limit < total,
  data: users
});
  } catch (error) {
    console.error("Error paginating users:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = paginateUsers;
