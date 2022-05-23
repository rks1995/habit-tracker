const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter Your Name!'],
    },
    email: {
      type: String,
      required: [true, 'Please Enter Your Email'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
