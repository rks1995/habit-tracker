const mongoose = require('mongoose');

const habbitSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please Add A Habbit!'],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    dates: [
      {
        date: String,
        status: {
          type: String,
          default: 'not-done',
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Habbit', habbitSchema);
