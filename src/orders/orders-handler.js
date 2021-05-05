const ordersService = require('./orders-service');
const { ORDER_STATUS } = require('../config');

// stripe related behaviour goes here...
module.exports = function ({ socket, io }) {
  socket.on('orders/initial_data', async () => {
    const data = await ordersService.getOrdersToday();
    io.sockets.emit('orders/get_data', data);
  });

  socket.on('orders/new_order', async (order) => {
    const orderFromDB = await ordersService.addNewOrder({ order });
    const queue = await ordersService.getActiveOrdersTodaySorted();
    io.sockets.emit('order/order_data', orderFromDB); //update individual order
    io.sockets.emit('orders/requery_initial_data');
    if (queue.length) {
      io.sockets.emit('orders/current_queue', queue);
    }
  });

  socket.on('orders/update_order', async (order) => {
    await ordersService.updateOrder({ order });
    const queue = await ordersService.getActiveOrdersTodaySorted();
    io.sockets.emit('order/order_data', order); //update individual order
    if (queue.length) {
      io.sockets.emit('orders/current_queue', queue);
    }
    io.sockets.emit('orders/requery_initial_data'); //update orders list
  });

  socket.on('orders/query_order_detail', async (order) => {
    const orderFromDB = await ordersService.getOrder({ order });
    const queue = await ordersService.getActiveOrdersTodaySorted();
    if (queue.length) {
      io.sockets.emit('orders/current_queue', queue);
    }
    io.sockets.emit('order/order_data', orderFromDB);
  });
};
