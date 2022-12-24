import { React,useContext } from 'react'
import { usePrismicDocumentByID } from '@prismicio/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus,faPlus,faXmark } from '@fortawesome/free-solid-svg-icons'
import { addToCart,decrementFromCart,removeFromCart,returnCartItemPrice,usFormatter } from '../helperFunctions'
import { ShoppingCartContext } from '../ShoppingCartContext'

function CartItem({ product,removeQtyControls }) {

     const { shoppingCartState,setShoppingCartState } = useContext(ShoppingCartContext)
    
    let itemObject = usePrismicDocumentByID(product.id)

  return (
    <div className='cart-item' style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',paddingBottom:'15px', paddingTop:'15px'}}>

        { removeQtyControls ? "" : <FontAwesomeIcon onClick={() => {removeFromCart(product.id,shoppingCartState,setShoppingCartState)}} icon={faXmark} className="cart-item-remove" />}

        <div style={{display:'flex',flexDirection:'row',justifyContent:'left', alignItems:'center', gap:'10px'}}>
            <img src={itemObject[0] && itemObject[0].data.image.url} style={{width:'25%'}}></img>
            <div style={{width:'95%'}}>
                <div style={{fontWeight:'600',marginBottom:'10px'}}>{itemObject[0] && itemObject[0].data.name[0].text}</div>
                    <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                        <div style={{userSelect:'none'}}>Qty: 

                            {/* minus button */}
                            {removeQtyControls ? " " :
                            <FontAwesomeIcon icon={faMinus} 
                                style={{paddingLeft:'10px',paddingRight:'10px',fontSize:'12px',cursor:'pointer',userSelect:'none'}}
                                onClick={() => {
                                    decrementFromCart(product.id,shoppingCartState,setShoppingCartState)
                                }} />}

                                <span style={{userSelect:'none'}}>{product.qty}</span>

                            {/* plus button */}
                            {removeQtyControls ? " " :
                            <FontAwesomeIcon icon={faPlus} 
                            style={{paddingLeft:'10px',fontSize:'12px',cursor:'pointer'}} 
                            onClick={() => {
                                addToCart(product.id,shoppingCartState,setShoppingCartState)
                            }}/>}
                            </div>

                            <div style={{fontWeight:'600'}}>
                                { returnCartItemPrice(itemObject,product).salePrice ? 
                                    <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'end',gap:'10px',}}>
                                        <span className='text-danger' style={{fontWeight:'lighter',fontSize:'85%',textDecoration:'line-through'}}>{usFormatter.format(returnCartItemPrice(itemObject,product).originalPrice)} </span>
                                        <span style={{lineHeight:'21px'}}>{usFormatter.format(returnCartItemPrice(itemObject,product).salePrice)}</span>
                                    </div>  : 
                                    <span style={{lineHeight:'21px'}}>{usFormatter.format(returnCartItemPrice(itemObject,product).originalPrice)}</span> }
                            </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem