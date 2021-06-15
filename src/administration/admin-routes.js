var express = require('express');

var router = express.Router();
var adminController = require('./admin-controller');

router.post('/are-we-open', adminController.areWeCurrentlyOpen);
router.get('/menu/get-menu', adminController.getMenu);
router.post('/menu/create-item', adminController.createItem);

module.exports = router;
