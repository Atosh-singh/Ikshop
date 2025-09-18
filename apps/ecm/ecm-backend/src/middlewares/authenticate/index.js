const jwt = require("jsonwebtoken");
const { Blacklisted } = require('@/models/blacklist');

const authenticate = async (req, res, next) => {
  try {
    // Extract token
    const token = req.headers["authorization"]?.split(" ")[1] || req.body.token || req.query.token;

    if (!token) {
      return res.status(403).json({
        success: false,
        msg: "Authentication token is required.",
      });
    }

    // Check if token is blacklisted
    const blacklistedToken = await Blacklisted.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({
        success: false,
        msg: "This session is invalid. Please log in again.",
      });
    }

    // Verify token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decodedData;
    console.log("Auth middleware user =>", req.user);

    req.token = token; // optional: logout me use ke liye


    next(); // proceed
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        msg: "Session expired. Please log in again.",
        jwtExpired: true,
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        msg: "Invalid token. Authorization denied.",
      });
    }

    return res.status(500).json({
      success: false,
      msg: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = { authenticate };
