const knex = require('knex');
const { DATABASE_URL, TZ } = require('./config');

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
  pool: {
    min: 1,
    max: 15,
    afterCreate: function (connection, callback) {
      connection.query("SET timezone = 'America/Los_Angeles';", function (err) {
        callback(err, connection);
      });
    },
  },
  searchPath: ['foodtruck', 'public'],
});

//close the connection pool
db.close = function () {
  var pool = knew.client.pool;
  pool.drain(pool.destroyAllNow);
};

module.exports = db;
