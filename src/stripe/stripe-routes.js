var express = require('express');

var router = express.Router();
var stripeController = require('./stripe-controller')

router.post('/create-payment-intent', stripeController.createPaymentIntent);

module.exports = router;