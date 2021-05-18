var express = require('express');

var router = express.Router();
var stripeController = require('./stripe-controller');
var { requireAuth } = require('../auth/auth-middleware');

router.post('/get-connection-token', stripeController.getConnectionToken); //this is used for public-facing tools, no need for auth middleware
router.post('/create-payment-intent', stripeController.createPaymentIntent); //this is used for public-facing tools, no need for auth middleware
router.post('/capture-payment', requireAuth, stripeController.capturePayment); //kitchen use only, protect with middleware
router.post('/refund-payment', requireAuth, stripeController.refundPayment); //kitchen use only, protect with middleware

module.exports = router;
