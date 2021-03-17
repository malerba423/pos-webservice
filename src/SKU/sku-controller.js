const skuService = require('./sku-service');

exports.getAllSKUs = async function(req, res) {
  try {
    const skus = await skuService.getAllSKUs();
    res.status(200).json({data: skus});
  } catch(e) {
    return res.status(500).json({ message: "An error occured during the getUserAccounts process" });
  }
}
