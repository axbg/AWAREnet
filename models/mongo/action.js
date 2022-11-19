const {Schema} = require('mongoose');

module.exports = (db) => {
  const ActionSchema = new Schema({
    description: String,
    pictures: [{ data: Buffer }],
    active: Boolean,
    ownerId: String
  });

  return db.model('action', ActionSchema);
};
