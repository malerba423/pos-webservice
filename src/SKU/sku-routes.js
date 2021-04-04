var express = require('express');
//const { requireAuth } = require('../middleware/authRouteGuard');
//const { requireAccount } = require('../middleware/accountRouteGuard');

var router = express.Router();

var skuController = require('./sku-controller');

router.get('/get-all-skus', skuController.getAllSKUs);
//router.post('/add-new-sku', requireAuth, requireAccount, skuController.addNewSKU);

module.exports = router;
