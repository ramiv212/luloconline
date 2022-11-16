import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { ShoppingCartContext } from '../ShoppingCartContext';
const instagram = require('../images/instagram-png-white.png')

function Topbar() {

  const { shoppingCartState,setShoppingCartState,appOverlayState,setAppOverlayState } = useContext(ShoppingCartContext)

  return (
    <div id='topbar'>

        {/* Announce bar */}
        <div style={{display: 'flex', alignItems:'center',justifyContent:'center',width:'100%',marginLeft:'20%'}}>
                <div>Free shipping on orders over $150 &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;Save up to 20%, 30%, 40% + <Link style={{color:'black'}} >see details</Link> </div>
        </div>
        
        {/* IG Logo */}
        <div style={{display:'flex',gap:'15px',flexDirection:'rows',width:'30%',alignItems:'center', justifyContent:'right',marginRight:'30px'}}>
          <img src={instagram} style={{height:'23px', float:"right"}}/>

          {/* Cart Icon */}
          <span style={{display: 'flex',alignItmes:'center',justifyContent:'left',cursor:'pointer'}} 
            onClick={() => {
            (setAppOverlayState(!appOverlayState))
          }}>
            <FontAwesomeIcon style={{fontSize:'23px',width:'40px'}} color='white' icon={faCartShopping}></FontAwesomeIcon>
            {shoppingCartState.length > 0 ?
            <span className='cartQty'>
              <span style={{width:'100%',display:'flex', justifyContent:'center',alignItems:'center',paddingBottom:'1px',paddingLeft:'0px'}}>
              {shoppingCartState.length}
              </span>
            </span> : ""}
          </span>


        </div>
    </div>
  )
}

export default Topbar