const express = require('express');

const app = express();
const port = 5000;

//use static files
app.use(express.static('assets'));

// set up ejs
app.set('view engine', 'ejs');
app.set('views', './views');

// routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Habbit Tracker',
  });
});

app.post('/user/register', (req, res) => {
  res.send('register user');
});

app.post('/user/login', (req, res) => {
  res.send('login user');
});

app.listen(port, () => {
  console.log(`server is up and running at port ${port}...`);
});
