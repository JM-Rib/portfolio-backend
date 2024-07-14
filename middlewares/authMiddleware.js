// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ path: path.resolve("routes", '../.env') }).parsed;
const JWT_SECRET = dotenv.JWT_SECRET;

async function authenticateJWT(req, res, next) {
  const authHeader = req?.headers?.authorization;
  
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Invalid token
      }
      // Attach the user to the request object
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // No token provided
  }
}

module.exports = authenticateJWT;
