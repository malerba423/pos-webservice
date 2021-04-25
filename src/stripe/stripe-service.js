const { STRIPE_SECRET_KEY, SALES_TAX_RATE } = require('../config');
const stripe = require('stripe')(STRIPE_SECRET_KEY);

exports.calculateOrderAmount = function (items) {
  //TODO: look up item price in DB and use that rather than trusting price data sent from client
  const dollarSum = items.reduce((a, b) => a + (b.price || 0), 0);
  const dollarSumAfterTax = dollarSum * (1 + Number(SALES_TAX_RATE));
  const penniesSumAfterTax = Math.round(dollarSumAfterTax * 100); //stripe expects number of pennies, so multiply by 100
  return penniesSumAfterTax;
};

exports.createLocation = async function () {
  const location = await stripe.terminal.locations.create({
    display_name: 'HQ',
    address: {
      line1: '3814 Lakeway Dr',
      city: 'Bellingham',
      state: 'WA',
      country: 'US',
      postal_code: '98229',
    },
  });
  return location;
};

exports.createPaymentIntent = async function ({ amount, tipAmount, isCardPresent }) {
  const args = {
    amount: amount + (tipAmount || 0),
    currency: 'usd',
  };
  if (isCardPresent) {
    args.payment_method_types = ['card_present'];
    args.capture_method = 'manual';
  }
  const paymentIntent = await stripe.paymentIntents.create(args);
  return paymentIntent;
};

exports.capturePayment = async function ({ paymentIntentId }) {
  const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);
  return paymentIntent;
};

exports.refundPayment = async function ({ paymentIntentId, amount }) {
  const payload = {
    payment_intent: paymentIntentId,
    amount: amount,
  };
  if (!amount) {
    delete payload.amount;
  }
  const refund = await stripe.refunds.create(payload);
  return refund;
};

//be sure to protect this behind authentication middleware
exports.getConnectionToken = async function () {
  let connectionToken = await stripe.terminal.connectionTokens.create();
  return connectionToken;
};
