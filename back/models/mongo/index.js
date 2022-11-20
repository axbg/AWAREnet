const {DB_URI} = require('../../properties');

const db = require('./db');
const UserModel = require('./user')(db);
const EventModel = require('./event')(db);
const ActionModel = require('./action')(db);
const RequestModel = require('./request')(db);

const connectDatabase = () => {
  db.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
};

module.exports = {
  connectDatabase,
  UserModel,
  EventModel,
  ActionModel,
  RequestModel
};
