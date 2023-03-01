const mongoose = require('mongoose');
const User = require('../models/userModel');

exports.createDocument = (role) => {
  return async (req, res) => {
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

    // If function was called for admin
    if (role === 'admin') {
      body.role = 'admin';
    }

    // Create user from body
    const user = await User.create(body);

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      user,
    });
  };
};

exports.getDocument = () => {
  return async (req, res) => {
    // Taking the id from the parameter
    const id = req.params.id;

    // If user wants only limited information,
    // he should query those fields with the request
    // ex.
    // '/api/v1/users/:id?firstName=true,email=true

    let user = await User.findById(id);

    // Check if user wants any particular field
    if (Object.keys(req.query).length !== 0) {
      // Taking all the keys of req.query
      const fields = Object.keys(req.query);

      // New object to filter rest of the fields
      let outputUser = {};

      // Filter all the fields apart from those mentioned
      fields.forEach((field) => {
        outputUser[field] = user[field];
      });

      // Updating the filtered user object
      user = { ...outputUser };
    }

    res.status(200).json({
      status: 'success',
      user,
    });
  };
};

exports.getAllDocuments = (role) => {
  return async (req, res) => {
    const users = await User.find({ role: `${role}` });

    res.status(200).json({
      status: 'sucess',
      results: users.length,
      users,
    });
  };
};

exports.updateDocument = () => {
  return async (req, res) => {
    if (req.body.password || req.body.role) {
      return res.status(400).json({
        status: 'fail',
        message: 'You cannot change these fields',
      });
    }

    // Updating the 'updatedAt' field when user updates document
    req.body.updatedAt = Date.now();

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      updatedUser: user,
    });
  };
};
