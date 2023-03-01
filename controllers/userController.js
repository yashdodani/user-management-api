const factory = require('./handlerFactory');

// Reusing code from the handlerFactory file
exports.createUser = factory.createDocument('user');

exports.getUser = factory.getDocument();

exports.getAllUsers = factory.getAllDocuments('user');

exports.updateUser = factory.updateDocument();
