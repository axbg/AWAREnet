const {Schema} = require('mongoose');

module.exports = (db) => {
  const RequestSchema = new Schema({
    eventId: String,
    actionId: String,
    ownerId: String,
    partnerId: String,
    description: String,
    response: Boolean,
    active: Boolean
  });

  return db.model('request', RequestSchema);
};
