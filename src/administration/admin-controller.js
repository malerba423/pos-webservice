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
