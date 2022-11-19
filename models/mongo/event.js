const {Schema} = require("mongoose");

module.exports = (db) => {
  const EventSchema = new Schema({
    title: String,
    shortDescription: String,
    description: String,
    location: [{ lat: String, long: String }],
    timestampCreated: Number,
    timestampStart: Number,
    action: String,
    type: String,
    pictures: [
      {
        type: String
      }
    ],
    owner: String,
    partners: [{type: String}],
    participants: [{ type: String }],
    followUp: {description: String, pictures: [{ type: String }]},
    ratings: [{ userId: String, rating: Number, comment: String }]
  });

  return db.model('event', EventSchema);
};
