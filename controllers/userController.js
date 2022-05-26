require('dotenv').config();
const jwt = require('jsonwebtoken');

const dashboardController = (req, res) => {
  res.render('dashboard', {
    title: 'Dahsboard',
    user: req.user,
  });
};

const logout = (req, res) => {
  res.redirect('/');
};

const changeView = (req, res) => {
  const { view } = req.query;
  const token = req.cookies.tokenKey;

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let { id, name, views } = decoded;

  views = view;

  const tokenKey = jwt.sign({ id, name, views }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
  res.clearCookie('tokenKey');
  res.cookie('tokenKey', tokenKey);
  res.redirect('/user/dashboard');
};

module.exports = {
  dashboardController,
  logout,
  changeView,
};
