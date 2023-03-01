const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A user should have a first name'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'A user should have a last name'],
  },
  email: {
    type: String,
    required: [true, 'A user should have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 6,
    maxLength: 12,
    // select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    // select: false
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  department: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

// Making Model from Schema
const User = mongoose.model('User', userSchema);

module.exports = User;
