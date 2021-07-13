const adminService = require('./admin-service');

// stripe related behaviour goes here...
module.exports = function ({ socket, io }) {
  socket.on('items/update_item', async (item) => {
    await adminService.updateItem({ item });
    const menu = await adminService.getMenu();
    io.sockets.emit('menu/updated_menu_data', { menu, itemid: item.id, optionid: null });
  });

  socket.on('items/update_option', async (option) => {
    await adminService.updateItemOption({ option });
    const menu = await adminService.getMenu();
    io.sockets.emit('menu/updated_menu_data', { menu, optionid: option.id, itemid: null });
  });

  socket.on('items/create_item_options', async (optionsArray) => {
    await adminService.createItemOptions({ optionsArray });
    const menu = await adminService.getMenu();
    io.sockets.emit('menu/updated_menu_data', { menu });
  });

  socket.on('store/open_store', async () => {
    await adminService.openStore();
    io.sockets.emit('store/store_open_status_updated', { open: true });
  });

  socket.on('store/close_store', async () => {
    await adminService.closeStore();
    io.sockets.emit('store/store_open_status_updated', { open: false });
  });
};
