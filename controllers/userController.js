const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  // Doing this way to avoid someone providing role='admin'
  const body = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    department: req.body.department,
  };

  // Create user from body
  const user = await User.create(body);

  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    user,
  });
};
