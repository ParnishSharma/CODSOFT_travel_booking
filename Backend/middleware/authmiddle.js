const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;

    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;
