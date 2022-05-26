const destroyTokken = (req, res, next) => {
  res.clearCookie('tokenKey');
  next();
};

module.exports = destroyTokken;
