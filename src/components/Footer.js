import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div style={{height:'50px',
        backgroundColor:'rgb(153,164,130)',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'}}
        
        id="footer">
      <div style={{width:'80%'}}>
        
        <Link to={'/home'} className='footer-link'>Home</Link>&nbsp; | &nbsp;
        <Link to={'/products'} className='footer-link'>Products</Link>&nbsp; | &nbsp;
        <Link to={'/learn'} className='footer-link'>Learn</Link>&nbsp; | &nbsp;
        <Link to={'/mission'} className='footer-link'>Mission</Link>&nbsp; | &nbsp;
        <Link to={'/policies'} className='footer-link'>Policies</Link>&nbsp; | &nbsp; 
        <Link to={'/contact'} className='footer-link'>Contact</Link>&nbsp; | &nbsp;

      </div>
    </div>
  )
}

export default Footer