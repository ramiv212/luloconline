import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MHH3RHHalFjzBOn90i0ZgHu78qFxStVFw9wNJg46Jk4ax7keUsJi0ii0y9SU7FqqMsx7oG8BUedkIvFIt2GOyXz00D0Pkwb9P");

function Checkout( { shoppingCartState,setAppOverlayState } ) {

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        setAppOverlayState(false)
        console.log(shoppingCartState && shoppingCartState)
        // Create PaymentIntent as soon as the page loads
        fetch(`${process.env.REACT_APP_SERVER_URL}/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(shoppingCartState)
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, []);

      const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',width:'90%',margin:'auto',justifyContent:'space-around'}}>

        <div>
            cart items
        </div>

        {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}

    </div>
  )
}

export default Checkout