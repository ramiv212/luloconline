import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { ShoppingCartContext } from '../ShoppingCartContext';
const instagram = require('../images/instagram-png-white.png')

function Topbar() {

  const { shoppingCartState,setShoppingCartState } = useContext(ShoppingCartContext)

  console.log(shoppingCartState)

  return (
    <div id='topbar'>
        <div style={{display: 'flex', alignItems:'center',justifyContent:'center',width:'100%',marginLeft:'20%'}}>
                <div>Free shipping on orders over $150 &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;Save up to 20%, 30%, 40% + <Link style={{color:'black'}} >see details</Link> </div>
        </div>
        <div style={{display:'flex',gap:'15px',flexDirection:'rows',width:'30%',alignItems:'center', justifyContent:'right',marginRight:'30px'}}>
          <img src={instagram} style={{height:'23px', float:"right"}}/>

          <span>
            <FontAwesomeIcon style={{fontSize:'23px'}} color='white' icon={faCartShopping}></FontAwesomeIcon>
            <span className='cartQty'>
              <span style={{width:'100%',display:'flex', justifyContent:'center',alignItems:'center',paddingTop:'0px'}}>
              {shoppingCartState.length}
              </span>
            </span>
          </span>
        </div>
    </div>
  )
}

export default Topbar