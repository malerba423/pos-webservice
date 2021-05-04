const knex = require('knex');
const { DATABASE_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
  pool: {
    min: 1,
    max: 7,
  },
  searchPath: ['foodtruck', 'public'],
});

//close the connection pool
db.close = function () {
  var pool = knew.client.pool;
  pool.drain(pool.destroyAllNow);
};

module.exports = db;
