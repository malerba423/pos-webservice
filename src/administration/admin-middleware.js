const multer = require('multer');
const appRoot = require('app-root-path');
const { MENU_IMAGES_PATH } = require('../config');

const menuImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, appRoot + MENU_IMAGES_PATH);
  },
  filename: (req, file, cb) => {
    const itemName = JSON.parse(req.body?.item)?.name || file.originalname;
    const fileName = itemName.toLowerCase().split(' ').join('-');
    const uniqueName =
      fileName + '-' + Date.now().toString() + '.' + file.originalname?.split('.').slice(-1)[0];
    cb(null, uniqueName);
  },
});

exports.menuImageUploadHandler = multer({
  storage: menuImageStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});
