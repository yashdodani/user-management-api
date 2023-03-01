const factory = require('./handlerFactory');

exports.createAdmin = factory.createDocument('admin');

exports.getAdmin = factory.getDocument();

exports.getAllAdmins = factory.getAllDocuments('admin');

exports.updateAdmin = factory.updateDocument();
