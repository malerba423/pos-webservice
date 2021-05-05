var express = require('express');

var router = express.Router();
var stripeController = require('./stripe-controller');
var { requireAuth } = require('../auth/auth-middleware');

router.post('/get-connection-token', stripeController.getConnectionToken); //PROTECT THIS WITH MIDDLEWARE
router.post('/create-payment-intent', stripeController.createPaymentIntent); //PROTECT THIS WITH MIDDLEWARE
router.post('/capture-payment', stripeController.capturePayment); //PROTECT THIS WITH MIDDLEWARE
router.post('/refund-payment', stripeController.refundPayment); //PROTECT THIS WITH MIDDLEWARE

module.exports = router;
