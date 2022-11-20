const {Schema} = require('mongoose');

module.exports = (db) => {
  const RequestSchema = new Schema({
    event: String,
    action: String,
    owner: String,
    partner: String,
    description: String,
    response: Boolean,
    active: Boolean,
    timestampCreated: Number
  });

  return db.model('request', RequestSchema);
};
