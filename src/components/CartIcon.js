import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

function CartIcon({shoppingCartState,appOverlayState,setAppOverlayState,navBar}) {

  return (
    <span style={{display: 'flex',alignItmes:'center',justifyContent:'left',cursor:'pointer'}} 
            onClick={() => {
            (setAppOverlayState(!appOverlayState))
          }}>
            <FontAwesomeIcon style={{fontSize:'23px',width:'40px',
            color:`${
                navBar ? "rgb(153,164,130,.8)" : "white"
            }`}} 
                icon={faCartShopping} ></FontAwesomeIcon>
            {shoppingCartState.length > 0 ?
            <span className={
                `${ navBar ? 'cartQtyNav' : 'cartQty' }` 
            } >
              <span style={{width:'100%',display:'flex', justifyContent:'center',alignItems:'center',paddingBottom:'1px',paddingLeft:'0px'}}>
                {/* reduce over all item in carts to get sum of qty */}
              {shoppingCartState.reduce((a,b) => a + parseInt(b.qty), 0)}
              </span>
            </span> : ""}
    </span>
  )
}

export default CartIcon