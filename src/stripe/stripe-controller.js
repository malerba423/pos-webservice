const { STRIPE_PUBLIC_KEY } = require('../config')
const stripeService = require('./stripe-service');

exports.createPaymentIntent = async function(req, res) {
  const { items, currency } = req.body;
  try {
    const paymentIntent = await stripeService.createPaymentIntent( { items, currency } );
    // Send public key and PaymentIntent details to client
    res.send({
        publicKey: STRIPE_PUBLIC_KEY,
        clientSecret: paymentIntent.client_secret
    });
  } catch(e) {
    return res.status(500).json({ message: "An error occured during the createPaymentIntent process" });
  }
}
