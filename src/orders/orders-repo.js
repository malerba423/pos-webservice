const db = require('../database');

function mapOrderGoingIntoDB(order) {
  return { ...order, items: JSON.stringify(order.items), tip: JSON.stringify(order.tip) };
}

exports.addNewOrder = async function ({ order }) {
  return await db('orders').insert(mapOrderGoingIntoDB(order));
};

exports.updateOrder = async function ({ order }) {
  return await db('orders').where({ id: order.id }).update(mapOrderGoingIntoDB(order));
};

exports.getOrdersToday = async function () {
  const res = await db('orders').whereRaw('inserted_at >= now()::date');
  return res;
};

exports.getOrder = async function ({ order }) {
  const res = await db('orders').where({ id: order.id }).first();
  return res;
};
