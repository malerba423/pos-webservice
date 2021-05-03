// stripe related behaviour goes here...
module.exports = function ({ socket, io }) {
  socket.on('orders/initial_data', () => {
    //console.log(io);
    console.log('made it here');
    const data = [{ timestamp: Date.now() }];
    io.sockets.emit('orders/get_data', data);

    //console.log(io.sockets.emit);
    //console.log('aaaand here');
  });
};
