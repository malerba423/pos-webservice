
const { STRIPE_SECRET_KEY } = require('../config')
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const calculateOrderAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

exports.createPaymentIntent = async function( { items, currency } )  {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: currency
    });
    return paymentIntent;
}