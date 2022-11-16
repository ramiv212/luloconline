import { useState,useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import { ShoppingCartContext } from '../ShoppingCartContext';

function Navigation() {

  const { shoppingCartState,appOverlayState,setAppOverlayState } = useContext(ShoppingCartContext)
  const [pageScroll, setPageScroll] = useState(0)

  window.addEventListener('scroll', (e) => {
    if (window.scrollY > 80 ) { setPageScroll(true) }
    else if ((window.scrollY < 80 )) { setPageScroll(false) }
  })


  return (
    <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className='nav-link' to='/'>Home</Link>
            <Link className='nav-link' to='/products'>Products</Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    <span className={`${
      pageScroll ? 'animate-fade-in navbar-show' : 'animate-fade-out navbar-hide'
    }`} style={{right:'2.5%',left:'auto',position:'absolute'}}>
      <CartIcon shoppingCartState={shoppingCartState} appOverlayState={appOverlayState} setAppOverlayState={setAppOverlayState} navBar={true}/>
    </span>

    </div>
  );
}

export default Navigation;