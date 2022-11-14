import React from 'react';
import { Link } from 'react-router-dom';
const instagram = require('../images/instagram-png-white.png')

function Topbar() {
  return (
    <div id='topbar'>
        <div style={{display: 'flex', alignItems:'center',justifyContent:'center',width:'100%',marginLeft:'50px'}}>
                <div>Free shipping on orders over $150 &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;Save up to 20%, 30%, 40% + <Link style={{color:'black'}} >see details</Link> </div>
        </div>
        <img src={instagram} style={{height:'40px', padding:'5px', float:"right",marginRight:"20px"}}/>
    </div>
  )
}

export default Topbar