const jwt = require("jsonwebtoken");

// Secret key for JWT - in production, store this in environment variables
const JWT_SECRET = "your_jwt_secret_key";

const verifyToken = (req, res, next) => {
  // Get auth header
  const authHeader = req.headers.authorization;

  // Check if auth header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "Access denied. No token provided.",
    });
  }

  // Get token from header (remove 'Bearer ' prefix)
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Add user data from token to request object
    req.user = decoded;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token.",
    });
  }
};

module.exports = verifyToken;
