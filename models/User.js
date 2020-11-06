const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [
    {
      text: {
        type: String,
        required: true,
      },
      done: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
