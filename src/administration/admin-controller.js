const adminService = require('./admin-service');

exports.areWeCurrentlyOpen = async function (req, res) {
  try {
    let resp = await adminService.areWeCurrentlyOpen();
    res.send(resp);
  } catch (e) {
    return res.status(500).json({
      message: 'An error occured during the areWeCurrentlyOpen process',
    });
  }
};

exports.getMenu = async function (req, res) {
  try {
    let resp = await adminService.getMenu();
    res.send(resp);
  } catch (e) {
    return res.status(500).json({
      message: 'An error occured during the getMenu process',
    });
  }
};

exports.createItem = async function (req, res) {
  try {
    const io = req.app.get('socketio');
    const item = JSON.parse(req.body.item);
    if (req.file?.filename) {
      item.image_name = req.file?.filename;
    }
    await adminService.createItem({ item });
    const menu = await adminService.getMenu();
    io.sockets.emit('menu/updated_menu_data', menu);
    res.status(200);
  } catch (e) {
    return res.status(500).json({
      message: 'An error occured during the getMenu process',
    });
  }
};
