const db = require('../database')
const { DATABASE_URL } = require('../config')

exports.getSKUs = async function() {
  console.log(DATABASE_URL)
  const rows = await db.raw( `SELECT * FROM public.sku` );
  return rows.rows;
}
