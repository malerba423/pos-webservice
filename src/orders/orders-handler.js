const ordersService = require('./orders-service');

// stripe related behaviour goes here...
module.exports = function ({ socket, io }) {
  socket.on('orders/initial_data', async () => {
    const data = await ordersService.getOrdersToday();
    io.sockets.emit('orders/get_data', data);
  });

  socket.on('orders/new_order', async (order) => {
    await ordersService.addNewOrder({ order });
    io.sockets.emit('orders/requery_initial_data');
  });

  socket.on('orders/update_order', async (order) => {
    await ordersService.updateOrder({ order });
    io.sockets.emit('orders/requery_initial_data'); //update orders list
    io.sockets.emit('order/order_data', order); //update individual order
  });

  socket.on('orders/query_order_detail', async (order) => {
    const orderFromDB = await ordersService.getOrder({ order });
    io.sockets.emit('order/order_data', orderFromDB);
  });
};
