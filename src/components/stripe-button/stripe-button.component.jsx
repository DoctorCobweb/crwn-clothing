import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_SePZ50ccoRtmjva31b58fWAw00KVfgR7Tk';
  
  const onToken = token => {
    console.log(token);
    alert('payment successful')
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