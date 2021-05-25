const db = require('../database');

exports.areWeCurrentlyOpen = async function () {
  const val = (await db.raw('SELECT are_we_currently_open()'))?.rows?.[0];
  return val;
};

exports.getMenu = async function () {
  console.log('aaaa');
  console.log(db.client.connectionSettings);

  const query = db('items').select('*');
  console.log(query.toString());

  const res1 = await query;
  console.log('bbbb');

  const res2 = await db('item_options').select('*');
  console.log('cccc');

  const res3 = await db('menu_groupings').select('*').orderBy('index', 'asc');
  console.log('dddd');

  const response = {
    items: res1,
    item_options: res2,
    menu_groups: res3,
  };
  return response;
};
