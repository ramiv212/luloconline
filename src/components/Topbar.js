import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../ShoppingCartContext';
import CartIcon from './CartIcon';
const instagram = require('../images/instagram-png-white.png')

function Topbar() {

  const { shoppingCartState,appOverlayState,setAppOverlayState } = useContext(ShoppingCartContext)

  return (
    <div id='topbar'>

        {/* Announce bar */}
        <div style={{display: 'flex', alignItems:'center',justifyContent:'center',flexDirection:'row',flexWrap:'wrap',width:'100%',marginLeft:'20%'}} id="topbar-text">
                <div>Free shipping on orders over $150 &nbsp;&nbsp;&nbsp;</div>
                <div>| &nbsp;&nbsp;&nbsp;Save up to 20%, 30%, 40% + <Link style={{color:'black'}} to={'/products/all/sale'} >see details</Link> </div>
        </div>
        
        {/* IG Logo */}
        <div style={{display:'flex',gap:'15px',flexDirection:'rows',width:'30%',alignItems:'center', justifyContent:'right',marginRight:'30px'}}>
          <img src={instagram} style={{height:'23px', float:"right"}}/>

          {/* Cart Icon */}
          <CartIcon shoppingCartState={shoppingCartState} appOverlayState={appOverlayState} setAppOverlayState={setAppOverlayState} navBar={false} />

        </div>
    </div>
  )
}

export default Topbar