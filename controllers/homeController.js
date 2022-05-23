const User = require('../models/user');
const jwt = require('jsonwebtoken');

const homeController = (req, res) => {
  if (req.cookies.tokenKey) {
    return res.redirect('/user/dashboard');
  }
  res.render('home', {
    title: 'Habbit Tracker',
  });
};

const signin = (req, res) => {
  res.render('signin', {
    title: 'Sign In',
  });
};

const signup = (req, res) => {
  res.render('register', {
    title: 'Sign Up',
  });
};

const createUser = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      if (password === confirm_password) {
        //create a user
        const user = await User.create({ name, email, password });
        return res.status(201).redirect('/login');
      }
    }
    res.status(401).json({ message: 'Error In Creating user' });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  try {
    if (user) {
      if (user.password === password) {
        //create token
        const { id, name } = user;
        const token = jwt.sign({ id, name }, 'secretkey', { expiresIn: '1h' });
        res.cookie('tokenKey', token);
        return res.redirect('/user/dashboard');
      }
    }
    res.redirect('/login');
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

module.exports = {
  homeController,
  signin,
  signup,
  createUser,
  loginUser,
};
