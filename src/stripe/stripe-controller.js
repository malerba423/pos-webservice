const { STRIPE_PUBLIC_KEY } = require("../config");
const stripeService = require("./stripe-service");

exports.getConnectionToken = async function (req, res) {
  try {
    let connectionToken = await stripeService.getConnectionToken();
    res.send({ secret: connectionToken.secret });
  } catch (e) {
    return res.status(500).json({
      message: "An error occured during the getConnectionToken process",
    });
  }
};

exports.createPaymentIntent = async function (req, res) {
  const { items } = req.body;
  try {
    const amount = stripeService.calculateOrderAmount(items);
    const paymentIntent = await stripeService.createPaymentIntent({ amount });
    // Send public key and PaymentIntent details to client
    res.send({
      publicKey: STRIPE_PUBLIC_KEY,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(500).json({
      message: "An error occured during the createPaymentIntent process",
    });
  }
};

exports.createPaymentIntentWithCardPresent = async function (req, res) {
  const { items } = req.body;
  try {
    const amount = stripeService.calculateOrderAmount(items);
    const paymentIntent = await stripeService.createPaymentIntentWithCardPresent(
      { amount }
    );
    // Send public key and PaymentIntent details to client
    res.send({
      publicKey: STRIPE_PUBLIC_KEY,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(500).json({
      message:
        "An error occured during the createPaymentIntentWithCardPresent process",
    });
  }
};
