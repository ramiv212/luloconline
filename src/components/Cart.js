import { React,useEffect } from 'react'
import CartItem from './CartItem'
import { Offcanvas,Button } from 'react-bootstrap'
import { useAllPrismicDocumentsByIDs } from '@prismicio/react'
import { returnCartTotal,usFormatter } from '../helperFunctions'

function Cart({appOverlayState,setAppOverlayState,shoppingCartState}) {

    const arrayOfIDs = []
    shoppingCartState && shoppingCartState.forEach(productObject => {
        arrayOfIDs.push(productObject.id)
    });
    
    const cartProducts =  useAllPrismicDocumentsByIDs(arrayOfIDs)

    // cartProducts && console.log(cartProducts)

  return (
    <>
    <Offcanvas show={appOverlayState} onHide={() => setAppOverlayState(false)} placement='end' id="cart">
    <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        
        <Offcanvas.Body style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'initial'}}>
            
            {shoppingCartState.length <= 0 ? <div 
                style={{fontSize:'27px',
                fontWeight:'normal',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                gap:'20px'}}>
                    
                Your Cart Is Empty

            <Button size='lg' style={{
                backgroundColor:'rgb(153,164,130)',
                    borderColor:'rgb(153,164,130)'}} 
                    onClick={() => {
                        setAppOverlayState(false)
                    }}>Keep Shopping
            </Button>

            </div> : <div 
                style={{display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'initial',
                        height:'60%',
                        width:'100%',
                        overflow:'scroll'}}>

                {shoppingCartState && shoppingCartState.map((product) => {
                    return <CartItem product={product} key={product.id} />                    
                })}
                
            </div>}
            
            <div style={{marginTop:'auto'}}>
                {returnCartTotal(shoppingCartState,cartProducts[0]) !== 0 ? cartProducts && returnCartTotal(shoppingCartState,cartProducts[0]) && usFormatter.format((returnCartTotal(shoppingCartState,cartProducts[0]))) : ""}
            </div>

        </Offcanvas.Body>

    </Offcanvas>
    </>
  )
}

export default Cart