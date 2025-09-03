const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  // Try to get the token from the Authorization header, body, or query params
  const token = req.headers["authorization"]?.split(" ")[1] || req.body.token || req.query.token;

  // Log the token to see if it's being extracted correctly
  console.log("Extracted Token:", token);

  // If no token is provided, return an error
  if (!token) {
    return res.status(403).json({
      success: false,
      msg: "Authentication token is required.",
    });
  }

  try {
    // Decode the token and verify it
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded data to verify it contains the user info
    console.log("Decoded Data:", decodedData);

    // Attach the decoded data (user info) to the request object
    req.user = decodedData;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle different types of errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        msg: "Session expired, please log in again.",
        jwtExpired: true,
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        msg: "Invalid token, authorization denied.",
      });
    }

    // Catch-all for other errors
    return res.status(500).json({
      success: false,
      msg: "Something went wrong, please try again later.",
      error: error.message,
    });
  }
};

module.exports = { authenticate };
