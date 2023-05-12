import dotenv from 'dotenv';
import express from 'express';
import Stripe from 'stripe';
import orderModel from '../models/orderModel.js';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const { cartItems, userId } = req.body;

  const cartItemsString = JSON.stringify(cartItems);

  if (cartItemsString.length > 500) {
    return res.status(400).send({
      message:
        'Sorry, we are unable to process your request as the items in your cart exceed the maximum allowed limit. Please remove some items and try again.',
    });
  }

  const customer = await stripe.customers.create({
    metadata: {
      userId,
      cart: cartItemsString,
    },
  });

  const line_item = cartItems.map((item) => {
    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price,
      },
      quantity: item.cartQuantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ['IN'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'inr',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1100 * 100,
            currency: 'inr',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 2,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items: line_item,
    mode: 'payment',
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/payment-success`,
    cancel_url: `${process.env.CLIENT_URL}/user/cart`,
    billing_address_collection: 'required',
  });

  res.send({ url: session.url });
});

// create order to save it to database
const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);

  const products = Items.map(({ _id, cartQuantity, name }) => ({
    productId: _id,
    quantity: cartQuantity,
    productName: name,
  }));

  const newOrder = new orderModel({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    await newOrder.save();
  } catch (err) {
    console.log(err);
  }
};

router.post(
  '/webhook',
  express.json({ type: 'application/json' }),
  async (req, res) => {
    let data;
    let eventType;

    // const webhookSecret = process.env.STRIPE_WEB_HOOK_SECRET;
    let webhookSecret;

    if (webhookSecret) {
      let event;
      const signature = req.headers['stripe-signature'];

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    if (eventType === 'checkout.session.completed') {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            createOrder(customer, data);
          } catch (err) {
            res.status(500).send('Server side error!');
          }
        })
        .catch((err) => {
          res.send('Server side error!' || err.message);
        });
    }

    res.status(200).end();
  }
);

export default router;
