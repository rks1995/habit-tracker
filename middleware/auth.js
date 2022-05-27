require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.cookies;
  if (!authHeader.tokenKey) {
    return res.status(401).json({ message: 'Unauthorized User' });
  }

  const token = authHeader.tokenKey;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie('tokenKey');
    res.redirect('/');
  }
};

module.exports = authMiddleware;
