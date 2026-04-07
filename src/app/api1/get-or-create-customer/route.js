export async function POST(request) {
  try {
    const Stripe = require("stripe"); // require inside function
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // initialize here

    const { email } = await request.json();
    console.log("Received Email: ", email);

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400 }
      );
    }

    // Check if customer already exists
    const customers = await stripe.customers.list({ email });
    let customer;

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({ email });
    }

    const coupon = await stripe.coupons.create({
      percent_off: 25,
      duration: 'once',
    });

    console.log("Coupon Created:", coupon);

    return new Response(
      JSON.stringify({ customerId: customer.id, couponId: coupon.id }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating or retrieving customer:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process request" }),
      { status: 500 }
    );
  }
}
