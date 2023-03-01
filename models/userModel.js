const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

    // validating if email is in correct form
    validate: [validator.isEmail, 'Please provide valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 6,
    maxLength: 12,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],

    // validate if password and passwordConfirm are same.
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

// Using a pre 'save' middleware to encrypt password before saving
userSchema.pre('save', async function (next) {
  // Only run this function if password was modified
  if (!this.isModified('password')) return next();

  // Encrypt the password
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

// Creating an Instance method to check password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Making Model from Schema
const User = mongoose.model('User', userSchema);

module.exports = User;
