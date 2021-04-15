const { STRIPE_SECRET_KEY } = require('../config');
const stripe = require('stripe')(STRIPE_SECRET_KEY);

exports.calculateOrderAmount = function (items) {
  //TODO: look up item price in DB and use that rather than trusting price data sent from client
  const dollarSum = items.reduce((a, b) => a + (b.price || 0), 0);
  return dollarSum * 100; //stripe expects number of pennies, so multiply by 100
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

exports.createPaymentIntent = async function ({ amount, tipAmount }) {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount + (tipAmount || 0),
    currency: 'usd',
    payment_method_types: ['card_present'],
    capture_method: 'manual',
  });
  return paymentIntent;
};

exports.capturePayment = async function ({ paymentIntentId }) {
  const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);
  return paymentIntent;
};

// exports.createPaymentIntentWithCardPresent = async function ({ amount, tipAmount }) {
//   // For Terminal payments, the 'payment_method_types' parameter must include
//   // 'card_present' and the 'capture_method' must be set to 'manual'
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount + (tipAmount || 0),
//     currency: 'usd',
//     payment_method_types: ['card_present'],
//     capture_method: 'manual',
//   });
//   return paymentIntent;
// };

//be sure to protect this behind authentication middleware
exports.getConnectionToken = async function () {
  let connectionToken = await stripe.terminal.connectionTokens.create();
  return connectionToken;
};
