var express = require('express');
var { menuImageUploadHandler } = require('./admin-middleware');

var router = express.Router();
var adminController = require('./admin-controller');

router.post('/are-we-open', adminController.areWeCurrentlyOpen);
router.get('/menu/get-menu', adminController.getMenu);
router.post('/menu/create-item', menuImageUploadHandler.single('itemImage'), adminController.createItem);

module.exports = router;
