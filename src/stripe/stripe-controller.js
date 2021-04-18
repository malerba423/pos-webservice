const { STRIPE_PUBLIC_KEY } = require('../config');
const stripeService = require('./stripe-service');

exports.getConnectionToken = async function (req, res) {
  try {
    let connectionToken = await stripeService.getConnectionToken();
    res.send({ secret: connectionToken.secret });
  } catch (e) {
    return res.status(500).json({
      message: 'An error occured during the getConnectionToken process',
    });
  }
};

exports.createPaymentIntent = async function (req, res) {
  const { items, tip } = req.body;
  try {
    const amount = stripeService.calculateOrderAmount(items);
    const tipAmount = (tip || 0) * 100;
    const paymentIntent = await stripeService.createPaymentIntent({
      amount,
      tipAmount,
    });
    // Send public key and PaymentIntent details to client
    res.send({
      public_key: STRIPE_PUBLIC_KEY,
      client_secret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'An error occured during the createPaymentIntent process',
    });
  }
};

exports.capturePayment = async function (req, res) {
  const { paymentIntentId } = req.body;
  try {
    const paymentIntent = await stripeService.capturePayment({ paymentIntentId });
    res.send({ paymentIntent });
  } catch (e) {
    return res.status(500).json({
      message: 'An error occured during the capturePayment process',
    });
  }
};

exports.refundPayment = async function (req, res) {
  const { paymentIntentId, amount } = req.body;
  try {
    const refund = await stripeService.refundPayment({ paymentIntentId, amount });
    res.send({ refund });
  } catch (e) {
    return res.status(500).json({
      message: 'An error occured during the refundPayment process',
    });
  }
};
