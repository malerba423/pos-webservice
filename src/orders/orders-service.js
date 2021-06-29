const ordersRepo = require('./orders-repo');

exports.addNewOrder = async function ({ order }) {
  const currentQueue = await ordersRepo.getActiveOrdersTodaySorted();
  order.queue_length = (currentQueue?.length || 0) + 1;
  const result = await ordersRepo.addNewOrder({ order });
  return result;
};

exports.markOrderCancelled = async function () {
  const result = await ordersRepo.markOrderCancelled();
  return result;
};

exports.markOrderDone = async function () {
  const result = await ordersRepo.markOrderDone();
  return result;
};

exports.markOrderNewAgain = async function () {
  const result = await ordersRepo.markOrderNewAgain();
  return result;
};

exports.updateOrder = async function ({ order }) {
  const result = await ordersRepo.updateOrder({ order });
  return result;
};

exports.getOrdersToday = async function () {
  const result = await ordersRepo.getOrdersToday();
  return result;
};

exports.getActiveOrdersTodaySorted = async function () {
  const result = await ordersRepo.getActiveOrdersTodaySorted();
  return result;
};

exports.getOrder = async function ({ order }) {
  const result = await ordersRepo.getOrder({ order });
  return result;
};
