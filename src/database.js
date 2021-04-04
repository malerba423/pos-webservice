const knex = require('knex');
const { DATABASE_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});

//close the connection pool
db.close = function () {
  var pool = Knex.client.pool;
  pool.drain(pool.destroyAllNow);
};

module.exports = db;
