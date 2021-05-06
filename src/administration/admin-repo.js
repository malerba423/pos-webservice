const db = require('../database');

exports.areWeCurrentlyOpen = async function () {
  const val = (await db.raw('SELECT are_we_currently_open()'))?.rows?.[0];
  return val;
};
