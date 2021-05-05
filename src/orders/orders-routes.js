var express = require('express');

var router = express.Router();
var ordersController = require('./orders-controller');

router.post('/new', ordersController.addNewOrder);

module.exports = router;
