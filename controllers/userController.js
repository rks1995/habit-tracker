require('dotenv').config();
const jwt = require('jsonwebtoken');
const habbits = require('../models/habbits');
const Habbit = require('../models/habbits');

// function to get day and date
function getD(n) {
  let d = new Date();
  d.setDate(d.getDate() + n);
  var newDate = d.toLocaleDateString('pt-br').split('/').reverse().join('-');
  var day;
  switch (d.getDay()) {
    case 0:
      day = 'Sun';
      break;
    case 1:
      day = 'Mon';
      break;
    case 2:
      day = 'Tue';
      break;
    case 3:
      day = 'Wed';
      break;
    case 4:
      day = 'Thu';
      break;
    case 5:
      day = 'Fri';
      break;
    case 6:
      day = 'Sat';
      break;
  }
  return { date: newDate, day, status: 'not-done' };
}

const dashboardController = async (req, res) => {
  try {
    const habbits = await Habbit.find({ user: req.user.id });

    if (!habbits) {
      habbits = [];
    }
    var days = [];
    days.push(getD(0));
    days.push(getD(1));
    days.push(getD(2));
    days.push(getD(3));
    days.push(getD(4));
    days.push(getD(5));
    days.push(getD(6));
    return res.render('dashboard', {
      title: 'Dashboard',
      user: req.user,
      habbits: habbits,
      days,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
};

const logout = (req, res) => {
  res.redirect('/');
};

// for changing views from daily to weekly or vice versa.
const changeView = (req, res) => {
  const { view } = req.query;
  const token = req.cookies.tokenKey;

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let { id, name, views } = decoded;

  views = view;

  const tokenKey = jwt.sign({ id, name, views }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
  res.cookie('tokenKey', tokenKey);
  res.redirect('/user/dashboard');
};

// controllers for CRUD operations
const addHabbit = async (req, res) => {
  const { content } = req.body;

  try {
    const habbit = await Habbit.findOne({ content });
    if (habbit) {
      //update the habbit
      let tzoffset = new Date().getTimezoneOffset() * 60000;
      let today = new Date(Date.now() - tzoffset).toISOString().slice(0, 10);

      const { dates } = habbit;

      let item = dates.at(0);

      if (item.date) {
        console.log('Habbit already exist!');
        return res.redirect('/');
      }

      dates.push({ date: today });
      habbits.dates = dates;
      habbits.save();
      res.redirect('back');
    } else {
      //create a new habbit
      let dates = [];
      let tzoffset = new Date().getTimezoneOffset() * 60000;
      var localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .slice(0, 10);

      dates.push({ date: localISOTime });

      await Habbit.create({ content, user: req.user.id, dates });

      return res.redirect('/user/dashboard');
    }
  } catch (error) {
    res.status(404).json({ message: 'Error' });
  }
};

const updateHabbitStatus = async (req, res) => {
  let { id, date } = req.query;

  try {
    const habbit = await Habbit.findById(id);
    const { dates } = habbit;
    let found = false;
    dates.find((item, index) => {
      if (item.date === date) {
        found = true;
        if (item.status === 'not-done') {
          item.status = 'done';
        } else if (item.status === 'done') {
          item.status = 'none';
        } else item.status = 'not-done';
      }
    });

    if (!found) {
      dates.push({ date, status: 'done' });
    }
    habbit.dates = dates;
    habbit.save();
    return res.redirect('/user/dashboard');
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteHabbit = async (req, res) => {
  try {
    const habbit = await Habbit.findByIdAndDelete(req.params.id);
    if (!habbit) {
      return res.status(404).json({ message: 'Habbit Not Found' });
    }
    res.redirect('back');
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  dashboardController,
  logout,
  changeView,
  addHabbit,
  updateHabbitStatus,
  deleteHabbit,
};
