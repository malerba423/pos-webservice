const db = require('../database');
const { ORDER_STATUS, TZ } = require('../config');

function mapOrderGoingIntoDB(order) {
  for (var i of order.items) {
    if (i?.chosen_options?.[0].price > 0) {
      i.price = null;
    }
  }
  const mapped = {
    ...order,
    items: JSON.stringify(order.items),
    tip: JSON.stringify(order.tip),
  };
  return mapped;
}

function mapOrdersComingOutOfDB(orders) {
  for (var o of orders) {
    for (var i of o.items) {
      if (i?.chosen_options?.[0].price > 0) {
        i.price = i?.chosen_options?.[0].price;
      }
    }
  }
  return orders;
}

exports.addNewOrder = async function ({ order }) {
  return (await db('orders').insert(mapOrderGoingIntoDB(order)).returning('*'))?.[0];
};

exports.updateOrder = async function ({ order }) {
  return await db('orders').where({ id: order.id }).update(mapOrderGoingIntoDB(order));
};

exports.getOrdersToday = async function () {
  let orders = await db('orders').whereRaw('inserted_at >= now()::date');
  orders = mapOrdersComingOutOfDB(orders);
  return orders;
};

exports.getActiveOrdersTodaySorted = async function () {
  let orders = await db('orders')
    .whereRaw('order_status IN (:status_new, :status_progress) and inserted_at >= now()::date', {
      status_new: ORDER_STATUS.NEW,
      status_progress: ORDER_STATUS.IN_PROGRESS,
    })
    .orderBy('inserted_at', 'asc');

  orders = mapOrdersComingOutOfDB(orders);
  return orders;
};

exports.getOrder = async function ({ order }) {
  let o = await db('orders').where({ id: order.id }).first();
  if (o?.id) {
    let orders = [o];
    orders = mapOrdersComingOutOfDB(orders);
    o = orders[0];
  }
  return o;
};
