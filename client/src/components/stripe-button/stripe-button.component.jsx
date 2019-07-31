import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_SePZ50ccoRtmjva31b58fWAw00KVfgR7Tk';
  
  const onToken = token => {
    // token allows stripe to know who is making the request,
    // and where it's coming from
    console.log(token);

    // axios returns a promise
    axios({
      url: 'payment', // request to our *own* url route
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    })
    .then(response => {
      alert('payment successful');
    }).catch(error => {
      console.log('payment error: ', error);

      // must use the test credit card, for now.
      alert('there was an issue with your payment. please make sure you use the provided credit card');
    });
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name="CRWN Clothing"
      billingAddress
      shippingAddress
      image="http://svgshare.com/i/CUz.svg"
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;