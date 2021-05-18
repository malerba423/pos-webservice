const elavonService = require('./elavon-service');

exports.getTransactionToken = async function (req, res) {
  try {
    let token = await elavonService.getTransactionToken(req.body);
    res.send({ token });
  } catch (e) {
    return res.status(500).json({
      message: 'An error occured during the getTransactionToken process',
    });
  }
};

exports.collectPayment = async function (req, res) {
  try {
    const paymentIntent = await elavonService.collectPayment(req.body);
    res.send({ paymentIntent });
  } catch (e) {
    return res.status(500).json({
      message: 'An error occured during the collectPayment process',
    });
  }
};
