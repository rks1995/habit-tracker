require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 5000;
const connectDB = require('./db/config');
const cookieParser = require('cookie-parser');

const homeRoutes = require('./routes');

//use static files
app.use(express.static('assets'));

// to extract form data & json data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// extract style and script from a sub-page to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', './views');

// routes
app.use('/', homeRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is up and running at port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
