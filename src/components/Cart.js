import React from 'react'
import { Offcanvas,Button } from 'react-bootstrap'

function Cart({appOverlayState,setAppOverlayState,shoppingCartState}) {

    console.log(shoppingCartState)

  return (
    <>
    <Offcanvas show={appOverlayState} onHide={() => setAppOverlayState(false)} placement='end' id="cart">
    <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        
        <Offcanvas.Body style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            
            {shoppingCartState.length <= 0 ? <div style={{fontSize:'23px',fontWeight:'normal'}}>Your Cart Is Empty</div> : "!!"}
            <br />
            <Button size='lg' style={{
                backgroundColor:'rgb(153,164,130)',
                    borderColor:'rgb(153,164,130)'}} 
                    onClick={() => {
                        setAppOverlayState(false)
                    }}>Keep Shopping</Button>

        </Offcanvas.Body>

    </Offcanvas>
    </>
  )
}

export default Cart