const {Schema} = require('mongoose');

module.exports = (db) => {
  const ActionSchema = new Schema({
    description: String,
    pictures: [{ type: String }],
    active: Boolean,
    owner: String,
    timestampCreated: Number
  });

  return db.model('action', ActionSchema);
};
