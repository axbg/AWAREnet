const {Schema} = require('mongoose');

module.exports = (db) => {
  const ActionSchema = new Schema({
    title: String,
    description: String,
    pictures: [{ type: String }],
    active: Boolean,
    owner: String,
    timestampCreated: Number
  });

  return db.model('action', ActionSchema);
};
