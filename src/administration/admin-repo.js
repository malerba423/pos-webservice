const db = require('../database');

exports.areWeCurrentlyOpen = async function () {
  const val = (await db.raw('SELECT are_we_currently_open()'))?.rows?.[0];
  return val;
};

exports.updateItem = async function ({ item }) {
  const itemForUpdate = {
    sold_out: item.sold_out,
    active: item.active,
  };
  return await db('items').where({ id: item.id }).update(itemForUpdate);
};

exports.createItem = async function ({ item }) {
  item.default_options = JSON.stringify(item.default_options);
  item.available_options = JSON.stringify(item.available_options);
  return await db('items').insert(item);
};

exports.editItem = async function ({ item }) {
  const { id } = item;
  delete item.id;
  item.default_options = JSON.stringify(item.default_options);
  item.available_options = JSON.stringify(item.available_options);
  return await db('items').update(item).where({ id });
};

exports.createItemOptions = async function ({ optionsArray }) {
  return await db('item_options').insert(optionsArray);
};

exports.updateItemOption = async function ({ option }) {
  const optionForUpdate = {
    sold_out: option.sold_out,
    active: option.active,
  };
  return await db('item_options').where({ id: option.id }).update(optionForUpdate);
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

exports.openStore = async function () {
  return await db('hours_of_operation_overrides').update({ currently_taking_orders: true });
};

exports.closeStore = async function () {
  return await db('hours_of_operation_overrides').update({ currently_taking_orders: false });
};
