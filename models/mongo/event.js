const {Schema} = require("mongoose");
const Buffer = require("buffer");

module.exports = (db) => {
  const EventSchema = new Schema({
    title: String,
    shortDescription: String,
    description: String,
    location: [{ lat: String, long: String }],
    timestampStart: String,
    action: String,
    type: String,
    pictures: [
      {
        data: Buffer
      }
    ],
    owners: [{type: String}],
    partners: [{type: String}],
    participants: [{ type: String }],
    followUp: {description: String, pictures: [{ data: Buffer }]},
    ratings: [{ userId: String, rating: Number }]
  });

  return db.model('event', EventSchema);
};
