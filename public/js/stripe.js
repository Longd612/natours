/*eslint-disable*/

import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    // 1. Get checkout session from API
    const stripe = Stripe(
      'pk_test_51LZzbbB78umF55MTnL7mF8qMXzlfGaSHfbE9v4pFWNWMnmoAbIHJvROEIlB5qq29reOLYhSQ9LqsQQvX8Rq5Mt3t007xUrjcyY'
    );
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2. Create checkout form + charge credit card
    // await stripe.redirectToCheckout({
    //   sessionId: session.data.session.id,
    // });
    location.replace(session.data.session.url);
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
