var express = require('express');

var router = express.Router();
var adminController = require('./admin-controller');

router.post('/are-we-open', adminController.areWeCurrentlyOpen);

module.exports = router;
