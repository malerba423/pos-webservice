
const { STRIPE_SECRET_KEY } = require('../config')
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const calculateOrderAmount = items => {
    //look up item price in DB and use that
    const dollarSum = items.reduce((a, b) => a + (b.price || 0), 0)
    return dollarSum * 100; //stripe expects number of pennies, so multiply by 100
};

exports.createPaymentIntent = async function( { items, currency } )  {
    // Create a PaymentIntent with the order amount and currency
    const amount = calculateOrderAmount(items)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency
    });
    return paymentIntent;
}