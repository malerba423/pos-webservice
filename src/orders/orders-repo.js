const db = require('../database');

function mapOrderGoingIntoDB(order) {
  return { ...order, items: JSON.stringify(order.items), tip: JSON.stringify(order.tip) };
}

exports.addNewOrder = async function ({ order }) {
  return await db('orders').insert(mapOrderGoingIntoDB(order));
};

exports.markOrderDone = async function (payload) {
  const { orderId } = payload;
  const orderUpdated = {
    order_status: 'DONE',
  };
  return await db('orders').where({ id: orderId }).update(orderUpdated);
};

exports.markOrderCancelled = async function (payload) {
  const { orderId } = payload;
  const orderUpdated = {
    order_status: 'CANCELLED',
  };
  return await db('orders').where({ id: orderId }).update(orderUpdated);
};

exports.markOrderNewAgain = async function (payload) {
  const { orderId } = payload;
  const orderUpdated = {
    order_status: 'NEW',
  };
  return await db('orders').where({ id: orderId }).update(orderUpdated);
};

exports.updateOrder = async function ({ order }) {
  return await db('orders').where({ id: order.id }).update(mapOrderGoingIntoDB(order));
};

exports.getOrdersToday = async function () {
  const res = await db('orders').whereRaw('inserted_at >= now()::date');
  return res;
};
