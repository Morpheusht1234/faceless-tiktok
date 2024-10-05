const stripe = require('stripe')(process.env.STRIPE_API_KEY);

async function createSubscription(user, plan) {
    const prices = {
        basic: 'price_12345', // Replace with your Stripe Price IDs
        pro: 'price_67890',
        premium: 'price_09876'
    };

    const subscription = await stripe.subscriptions.create({
        customer: user.stripeCustomerId,
        items: [{ price: prices[plan] }],
        expand: ['latest_invoice.payment_intent'],
    });

    return subscription;
}

module.exports = createSubscription;
