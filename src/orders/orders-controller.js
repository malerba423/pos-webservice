const ordersService = require('./orders-service');

exports.addNewOrder = async function (req, res) {
  const { order } = req.body;
  const io = req.app.get('socketio');

  try {
    order.items = order.items.map((i) => {
      delete i.image_src_base64;
      return i;
    });
    const orderResult = await ordersService.addNewOrder({ order });
    res.send({ order: orderResult });

    const queue = await ordersService.getActiveOrdersTodaySorted();
    io.sockets.emit('order/notify_kitchen_of_new_order');
    io.sockets.emit('orders/current_queue', queue);
    io.sockets.emit('orders/requery_initial_data');
  } catch (e) {
    return res.status(500).json({
      message: 'An error occured during the addNewOrder process',
    });
  }
};
