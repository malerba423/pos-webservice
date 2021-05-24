const merchantID = '0023765'; //Converge 6 or 7-Digit Account ID *Not the 10-Digit Elavon Merchant ID*
const merchantUserID = 'apiuser185070'; //Converge User ID *MUST FLAG AS HOSTED API USER IN CONVERGE UI*
const merchantPIN = '04EW0LQGNQ2R5ENHU1NRCJPHDLGQQ9DK8OYQBSLKQL0PNZ4V73P4S47DPVMQV41V'; //Converge PIN (64 CHAR A/N)
const vendorID = 'sc777033'; //Vendor ID
const tranactionTokenURL = 'https://api.demo.convergepay.com/hosted-payments/transaction_token'; // URL to Converge demo session token server
const axios = require('axios');
//const CheckoutJS = require('./elavon-checkout-js');

exports.getTransactionToken = async function (props) {
  const params = new URLSearchParams();
  params.append('ssl_first_name', props?.ssl_first_name);
  params.append('ssl_last_name', props?.ssl_last_name);
  params.append('ssl_amount', props?.ssl_amount);
  params.append('ssl_avs_address', props?.ssl_avs_address);
  params.append('ssl_avs_zip', props?.ssl_avs_zip);
  params.append('ssl_get_token', 'Y');
  params.append('ssl_add_token', 'Y');
  params.append('ssl_merchant_id', merchantID);
  params.append('ssl_user_id', merchantUserID);
  params.append('ssl_pin', merchantPIN);
  params.append('ssl_vendor_id', vendorID);
  params.append('ssl_transaction_type', 'ccsale');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const tokenResult = await axios.post(tranactionTokenURL, params, config);
  return tokenResult?.data;
};

// exports.collectPayment = async function (props) {
//   var paymentData = {
//     ssl_txn_auth_token: props.token,
//     ssl_card_number: props.card,
//     ssl_exp_date: props.exp,
//     ssl_get_token: props.gettoken,
//     ssl_add_token: props.addtoken,
//     ssl_first_name: props.firstname,
//     ssl_last_name: props.lastname,
//     ssl_avs_address: props.address,
//     ssl_avs_zip: props.zip,
//     ssl_cvv2cvc2: props.cvv,
//     ssl_merchant_txn_id: props.merchanttxnid,
//   };
//   let result = {};
//   var callback = {
//     onError: function (error) {
//       result.message = error;
//       result.approved = false;
//       result.declined = false;
//       return result;
//     },
//     onDeclined: function (response) {
//       result.message = 'Declined';
//       result.approved = false;
//       result.declined = true;
//       return result;
//     },
//     onApproval: function (response) {
//       result.message = 'Approved';
//       result.approved = approved;
//       result.declined = false;
//       result.approvalCode = response['ssl_approval_code'];
//       return result;
//     },
//   };
//   return await CheckoutJS.ConvergeEmbeddedPayment.pay(paymentData, callback);
// };
