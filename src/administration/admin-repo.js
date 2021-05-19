const db = require('../database');

exports.areWeCurrentlyOpen = async function () {
  const val = (await db.raw('SELECT are_we_currently_open()'))?.rows?.[0];
  return val;
};

exports.getMenu = async function () {
  const res1 = await db('items').select('*');
  const res2 = await db('item_options').select('*');
  const res3 = await db('menu_groupings').select('*').orderBy('index', 'asc');

  const response = {
    items: res1,
    item_options: res2,
    menu_groups: res3,
  };
  return response;
};
