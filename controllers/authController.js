const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new Error('Please provide email and password'));
  }

  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email: email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new Error('Incorrect email or password'));
  }

  // 3) If all ok, send token to the user
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    message: 'Logged in successfully',
    token,
  });
};

exports.protect = async (req, res, next) => {
  // 1) Get the token, check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new Error('You are not logged in, please login to get access'));
  }

  // 2) Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new Error('User does not exist'));
  }

  // 4) Grant access to the protected route
  req.user = currentUser;
  next();
};

exports.restrictTo = (role) => {
  return (req, res, next) => {
    console.log(role);
    if (role !== req.user.role) {
      return next(new Error('You do not have permission to access this route'));
    }
    next();
  };
};
