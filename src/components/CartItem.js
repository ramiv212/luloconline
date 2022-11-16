import { React,useContext } from 'react'
import { usePrismicDocumentByID } from '@prismicio/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus,faPlus } from '@fortawesome/free-solid-svg-icons'
import { addToCart,removeFromCart } from '../helperFunctions'
import { ShoppingCartContext } from '../ShoppingCartContext'

function CartItem({product}) {

     const { shoppingCartState,setShoppingCartState } = useContext(ShoppingCartContext)
    
    let itemObject = usePrismicDocumentByID(product.id)

  return (
    <div className='cart-item' style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',padding:'15px'}}>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'left', alignItems:'center', gap:'10px'}}>
            <img src={itemObject[0] && itemObject[0].data.image.url} style={{width:'25%'}}></img>
            <div>
                <div style={{fontWeight:'600'}}>{itemObject[0] && itemObject[0].data.name[0].text}</div>
                <div>Qty: 

                    {/* minus button */}
                    <FontAwesomeIcon icon={faMinus} 
                        style={{paddingLeft:'10px',paddingRight:'10px',fontSize:'12px',cursor:'pointer'}}
                        onClick={() => {
                            removeFromCart(product.id,shoppingCartState,setShoppingCartState)
                        }} /> 

                        {product.qty} 

                    {/* plus button */}
                    <FontAwesomeIcon icon={faPlus} 
                    style={{paddingLeft:'10px',fontSize:'12px',cursor:'pointer'}} 
                    onClick={() => {
                        addToCart(product.id,shoppingCartState,setShoppingCartState)
                    }}/></div>

            </div>
        </div>
    </div>
  )
}

export default CartItem