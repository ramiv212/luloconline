import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import CartItem from "./CartItem"

import {
    returnCartTotal,
    returnFullCartTotal, 
    usFormatter,
  } from "../helperFunctions";

import { useAllPrismicDocumentsByIDs } from "@prismicio/react";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MHH3RHHalFjzBOn90i0ZgHu78qFxStVFw9wNJg46Jk4ax7keUsJi0ii0y9SU7FqqMsx7oG8BUedkIvFIt2GOyXz00D0Pkwb9P");

function Checkout( { shoppingCartState,setAppOverlayState } ) {

    // get IDs of all items in the shopping cart and put them in an array
    const arrayOfIDs = [];
    shoppingCartState &&
        shoppingCartState.forEach((productObject) => {
        arrayOfIDs.push(productObject.id);
        });

    // get all the items from prismic using the array of IDs
    const cartProducts = useAllPrismicDocumentsByIDs(arrayOfIDs);

    
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        setAppOverlayState(false)
        console.log(shoppingCartState && shoppingCartState)

        if( shoppingCartState.length !== 0 ) {
            // Create PaymentIntent as soon as the page loads
            fetch(`${process.env.REACT_APP_SERVER_URL}/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(shoppingCartState)
            })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
        } else {
            return
        }

    }, []);

      const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

  return (
    <div style={{display:'flex',alignItems:'center',padding:'20px',width:'90%',margin:'auto',justifyContent:'space-around'}}>

    {/* check if there are any items in the cart. If not then don't show payment screen. */}
    {shoppingCartState && shoppingCartState.length !== 0 ? <>
    
        <div style={{width:'50%'}}>
        {shoppingCartState &&
                shoppingCartState.map((product) => {
                  return <CartItem product={product} key={product.id} removeQtyControls={true} />;
                })}

            {/* cart total */}
            <div style={{ display:'flex', justifyContent:'center',fontSize:'130'}}>

                Total: &nbsp;

              {returnCartTotal(shoppingCartState, cartProducts[0]) !== 0
                ? cartProducts &&
                  returnCartTotal(shoppingCartState, cartProducts[0]) &&
                  usFormatter.format(
                    returnCartTotal(shoppingCartState, cartProducts[0])
                  )
                : ""}
            </div>

        </div>

        {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </> : <>You have no items in your cart.</>}

    </div>
  )
}

export default Checkout