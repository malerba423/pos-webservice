const db = require('../database');
const { ORDER_STATUS } = require('../config');

function mapOrderGoingIntoDB(order) {
  const mapped = {
    ...order,
    items: JSON.stringify(order.items),
    tip: JSON.stringify(order.tip),
  };
  return mapped;
}

exports.addNewOrder = async function ({ order }) {
  return (await db('orders').insert(mapOrderGoingIntoDB(order)).returning('*'))?.[0];
};

exports.updateOrder = async function ({ order }) {
  return await db('orders').where({ id: order.id }).update(mapOrderGoingIntoDB(order));
};

exports.getOrdersToday = async function () {
  const res = await db('orders').whereRaw('inserted_at >= now()::date');
  return res;
};

exports.getActiveOrdersTodaySorted = async function () {
  const res = await db('orders')
    .whereRaw('order_status IN (:status_new, :status_progress) and inserted_at >= now()::date', {
      status_new: ORDER_STATUS.NEW,
      status_progress: ORDER_STATUS.IN_PROGRESS,
    })
    .orderBy('inserted_at', 'asc');
  return res;
};

exports.getOrder = async function ({ order }) {
  const res = await db('orders').where({ id: order.id }).first();
  return res;
};
