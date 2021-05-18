const merchantID = '0023765'; //Converge 6 or 7-Digit Account ID *Not the 10-Digit Elavon Merchant ID*
const merchantUserID = 'apiuser185070'; //Converge User ID *MUST FLAG AS HOSTED API USER IN CONVERGE UI*
const merchantPIN = '04EW0LQGNQ2R5ENHU1NRCJPHDLGQQ9DK8OYQBSLKQL0PNZ4V73P4S47DPVMQV41V'; //Converge PIN (64 CHAR A/N)
const vendorID = 'sc777033'; //Vendor ID
const tranactionTokenURL = 'https://api.demo.convergepay.com/hosted-payments/transaction_token'; // URL to Converge demo session token server
const axios = require('axios');

exports.getTransactionToken = async function ({
  ssl_first_name,
  ssl_last_name,
  ssl_amount,
  ssl_avs_address,
  ssl_avs_zip,
}) {
  const payload = {
    ssl_first_name,
    ssl_last_name,
    ssl_amount,
    ssl_avs_address,
    ssl_avs_zip,
    ssl_get_token: 'Y',
    ssl_add_token: 'Y',
    ssl_merchant_id: merchantID,
    ssl_user_id: merchantUserID,
    ssl_pin: merchantPIN,
    ssl_vendor_id: vendorID,
    ssl_transaction_type: 'ccsale',
    ssl_verify: false,
  };

  const tokenResult = await axios.post(tranactionTokenURL, payload);
  return tokenResult;
};

exports.collectPayment = async function () {
  const res = 'blah';
  return res;
};
