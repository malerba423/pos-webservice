var express = require('express');

var router = express.Router();
var elavonController = require('./elavon-controller');

router.post('/get-transaction-token', elavonController.getTransactionToken); //this is used for public-facing tools, no need for auth middleware
router.post('/collect-payment', elavonController.collectPayment); //this is used for public-facing tools, no need for auth middleware

module.exports = router;
