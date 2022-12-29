import { React,useContext,useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Button } from 'react-bootstrap'
import { ShoppingCartContext } from '../ShoppingCartContext';

function Success() {
    
  const navigate = useNavigate()

  const { setShoppingCartState } = useContext(ShoppingCartContext)

  useEffect(() => {
    setShoppingCartState([])
  },[])
    
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center',textAlign:'center',width:'90%',margin:'auto', height:'calc(100vh - 255px)',flexDirection:'column', gap:'30px'}}>

        <h1 style={{color:'rgb(115,125,98)'}}>Thank you for your order!</h1>
        <h2>You will receive an order confirmation email soon</h2>

        <Button style={{backgroundColor:'rgb(153,164,130)',
                        borderColor:'rgb(153,164,130)' }
                        } size="lg"
                        onClick={() => navigate('/products')}
                        >Continue Shopping</Button>

    </div>
  )
}

export default Success