import './index.css';
import { useState } from 'react'
import { Routes,Route } from 'react-router-dom';
import { usePrismicDocumentByUID } from '@prismicio/react';
import Topbar from './components/Topbar';
import Navigation from './components/Navigation';
import Products from './components/Products';
import { ProductFilterContext } from './ProductFilterContext'
const logo = require('./images/LuloC_logo_webp.webp')


// TODOS
// Out of stock. Need QTY of items? Subtract qty when item is sold?
// remove onSale bool, add sale tag only if sale price exists
// Make the error page pretty

function App() {

  const [productFilter, setProductFilter] = useState([])

  const [document] = usePrismicDocumentByUID('homepage', 'homepage')

  return (
      <div className="App">
        {/* <div>{ document && (<PrismicRichText field={document.data.title} />) }</div> */}
        
        <Topbar />

        <img src={logo}  width="200px"/>

        <div id='navigation-container'>
          <Navigation id={'navigation'} />
        </div>  

        <div style={{display:'flex', width:'100%'}}>
       <ProductFilterContext.Provider value={{ productFilter,setProductFilter }}>
        <Routes>
          <Route path='/products' element={<Products />} />
        </Routes>
       </ProductFilterContext.Provider>      

        </div>

      </div>
  );
}

export default App;
