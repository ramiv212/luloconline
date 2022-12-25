import { React ,useState,useEffect} from "react";
import CartItem from "./CartItem";
import { Offcanvas, Button } from "react-bootstrap";
import { useAllPrismicDocumentsByIDs } from "@prismicio/react";
import {
  returnCartTotal,
  returnFullCartTotal, 
  usFormatter,
} from "../helperFunctions";


function Cart({ appOverlayState, setAppOverlayState, shoppingCartState, setShoppingCartState }) {

  const [chekoutButtonDisabled, setCheckoutButtonDisabled] = useState(false)

  useEffect(() => {
    if (shoppingCartState.length > 0) {
      setCheckoutButtonDisabled(false) 
    } else {
      setCheckoutButtonDisabled(true)
    }
  }, [shoppingCartState])
  

  // get IDs of all items in the shopping cart and put them in an array
  const arrayOfIDs = [];
  shoppingCartState &&
    shoppingCartState.forEach((productObject) => {
      arrayOfIDs.push(productObject.id);
    });

  // get all the items from prismic using the array of IDs
  const cartProducts = useAllPrismicDocumentsByIDs(arrayOfIDs);
  

  function createCheckoutSession(shoppingCartState) {
    fetch(`${process.env.REACT_APP_SERVER_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: shoppingCartState,
      })
     }
    ).then( res => {
      if (res.ok){ 
        setShoppingCartState([])
        return res.json()
      }
      return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
      window.location = url
    }).catch(e => {
      console.error(e.error)
    })
  }


  return (
    <>
      <Offcanvas
        show={appOverlayState}
        onHide={() => setAppOverlayState(false)}
        placement="end"
        id="cart"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {shoppingCartState.length <= 0 ? (
            <div
              style={{
                fontSize: "27px",
                fontWeight: "normal",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                margin: "auto",
              }}
            >
              Your Cart Is Empty
              <Button
                size="lg"
                style={{
                  backgroundColor: "rgb(153,164,130)",
                  borderColor: "rgb(153,164,130)",
                }}
                onClick={() => {
                  setAppOverlayState(false);
                }}
              >
                Keep Shopping
              </Button>
            </div>
          ) : (
            <div
              className="cart-items-div"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "initial",
                height: "75%",
                width: "100%",
                overflow: "scroll",
              }}
            >
              {shoppingCartState &&
                shoppingCartState.map((product) => {
                  return <CartItem product={product} key={product.id} />;
                })}
            </div>
          )}

          <div
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              padding: "10px",
              fontSize: "24px",
            }}
          >
            <div style={{ margin: "auto" }}>SUBTOTAL:</div>
            <div
              className="text-danger"
              style={{
                margin: "auto",
                fontWeight: "lighter",
                fontSize: "85%",
                textDecoration: "line-through",
              }}
            >
              {returnFullCartTotal(shoppingCartState, cartProducts[0]) !== 0 &&
              returnFullCartTotal(shoppingCartState, cartProducts[0]) !==
                returnCartTotal(shoppingCartState, cartProducts[0])
                ? cartProducts &&
                  returnFullCartTotal(shoppingCartState, cartProducts[0]) &&
                  usFormatter.format(
                    returnFullCartTotal(shoppingCartState, cartProducts[0])
                  )
                : ""}
            </div>

            <div style={{ margin: "auto" }}>
              {returnCartTotal(shoppingCartState, cartProducts[0]) !== 0
                ? cartProducts &&
                  returnCartTotal(shoppingCartState, cartProducts[0]) &&
                  usFormatter.format(
                    returnCartTotal(shoppingCartState, cartProducts[0])
                  )
                : ""}
            </div>

          </div>
        </Offcanvas.Body>
        <button
          disabled={chekoutButtonDisabled}
          className="btn btn-dark w-100"
          style={{ borderRadius: "0", fontSize: "23px", height: "11%" }}
          onClick={() => {
            createCheckoutSession(shoppingCartState)
          }}
        >
          CHECK OUT
        </button>
      </Offcanvas>
    </>
  );
}

export default Cart;
