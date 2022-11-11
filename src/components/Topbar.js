import React from 'react'
const instagram = require('../images/instagram-png-white.png')

function Topbar() {
  return (
    <div id='topbar'>
        <img src={instagram} style={{height:'40px', padding:'5px', float:"right",marginRight:"20px"}}/>
    </div>
  )
}

export default Topbar