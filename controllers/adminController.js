const factory = require('./handlerFactory');

// Reusing the code from the handlerFactory file
exports.createAdmin = factory.createDocument('admin');

exports.getAdmin = factory.getDocument();

exports.getAllAdmins = factory.getAllDocuments('admin');

exports.updateAdmin = factory.updateDocument();
