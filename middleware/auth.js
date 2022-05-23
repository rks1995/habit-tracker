const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.cookies;
  if (!authHeader.tokenKey) {
    return res.status(401).json({ message: 'Unauthorized User' });
  }

  const token = authHeader.tokenKey;

  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (error) {
    res.redirect('/login');
  }
};

module.exports = authMiddleware;
