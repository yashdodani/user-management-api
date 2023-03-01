const User = require('../models/userModel');
const factory = require('./handlerFactory');

exports.createUser = factory.createDocument('user');

exports.getUser = factory.getDocument();

exports.getAllUsers = factory.getAllDocuments('user');

exports.updateUser = factory.updateDocument();
