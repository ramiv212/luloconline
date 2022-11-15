import './index.css';
import { useState,useContext } from 'react'
import { Routes,Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import Navigation from './components/Navigation';
import Home from './components/Home'
import Products from './components/Products';
import { ProductFilterContext } from './ProductFilterContext'
import { ShoppingCartContext } from './ShoppingCartContext';
import ErrorPage from './components/ErrorPage';
const logo = require('./images/LuloC_logo_webp.webp')


// TODOS
// Out of stock. Need QTY of items? Subtract qty when item is sold?
// remove onSale bool, add sale tag only if sale price exists
// Make the error page pretty

function App() {

  const [productFilter, setProductFilter] = useState([])
  const [shoppingCartState, setShoppingCartState] = useState([])

  return (
      <div className="App">
        <ShoppingCartContext.Provider value={{ shoppingCartState,setShoppingCartState }}>
        <ProductFilterContext.Provider value={{ productFilter,setProductFilter }}>
        {/* <div>{ document && (<PrismicRichText field={document.data.title} />) }</div> */}
        
        <Topbar />

        <img src={logo}  width="200px"/>

        <div id='navigation-container'>
          <Navigation id={'navigation'} />
        </div>  

        <div style={{display:'flex', width:'100%'}}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path="*" element={<ErrorPage />} /> {/* TODO fix this later */}
          </Routes>
        

        </div>
        </ProductFilterContext.Provider>      
      </ShoppingCartContext.Provider>
      </div>
  );
}

export default App;
