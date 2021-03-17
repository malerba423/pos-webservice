const skuRepo = require('./sku-repo');

exports.getAllSKUs = async function()  {
  const skus = await skuRepo.getSKUs();
  return skus || null;
}