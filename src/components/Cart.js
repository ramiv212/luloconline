import { React,useEffect } from 'react'
import CartItem from './CartItem'
import { Offcanvas,Button } from 'react-bootstrap'

function Cart({appOverlayState,setAppOverlayState,shoppingCartState}) {

    useEffect(() => {
        console.log(shoppingCartState)
    }, [shoppingCartState])
    

  return (
    <>
    <Offcanvas show={appOverlayState} onHide={() => setAppOverlayState(false)} placement='end' id="cart">
    <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        
        <Offcanvas.Body style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            
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
                        height:'100%',
                        width:'100%'}}>

                {shoppingCartState && shoppingCartState.map((product) => {
                    return <CartItem product={product} />                    
                })}
                
            </div>}
            

        </Offcanvas.Body>

    </Offcanvas>
    </>
  )
}

export default Cart