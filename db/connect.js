const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _client;

const initDb = (callback) => {
  if (_client) {
    console.log('Db is already initialized!');
    return callback(null, _client);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _client = client;
      callback(null, _client);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_client) {
    throw Error('Db not initialized');
  }
  return _client;
};

module.exports = {
  initDb,
  getDb
};
