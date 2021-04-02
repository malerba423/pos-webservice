var express = require("express");

var router = express.Router();
var stripeController = require("./stripe-controller");

router.post("/get-connection-token", stripeController.getConnectionToken); //PROTECT THIS WITH MIDDLEWARE
router.post("/create-payment-intent", stripeController.createPaymentIntent); //PROTECT THIS WITH MIDDLEWARE
router.post(
  "/create-payment-intent-with-card-present",
  stripeController.createPaymentIntentWithCardPresent //PROTECT THIS WITH MIDDLEWARE
);

module.exports = router;
