const mongoose = require('mongoose');

const updatedFieldsSchema = mongoose.Schema({
  userId: String,
  fieldName: String,
  fieldOldValue: String,
  fieldNewValue: String,
});

const UpdatedFields = mongoose.model('UpdatedFields', updatedFieldsSchema);

module.exports = UpdatedFields;
