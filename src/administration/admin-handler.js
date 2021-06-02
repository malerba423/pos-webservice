const adminService = require('./admin-service');

// stripe related behaviour goes here...
module.exports = function ({ socket, io }) {
  socket.on('items/update_item', async (item) => {
    await adminService.updateItem({ item });
    const menu = await adminService.getMenu();
    io.sockets.emit('menu/updated_menu_data', menu);
  });
};
