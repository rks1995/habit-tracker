const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 5000;

//use static files
app.use(express.static('assets'));

// extract style and script from a sub-page to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', './views');

// routes
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Habbit Tracker',
  });
});

app.get('/user/register', (req, res) => {
  res.render('register', {
    title: 'Sign Up',
  });
});

app.get('/user/login', (req, res) => {
  res.render('signin', {
    title: 'Sign-In',
  });
});

app.listen(port, () => {
  console.log(`server is up and running at port ${port}...`);
});
