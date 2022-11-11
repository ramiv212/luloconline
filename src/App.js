import './index.css';
import { PrismicRichText, usePrismicDocumentByUID, usePrismicDocumentsByType } from '@prismicio/react';
import Topbar from './components/Topbar';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Products from './components/Products';
const logo = require('./images/LuloC_logo_webp.webp')


function App() {


  const [document] = usePrismicDocumentByUID('homepage', 'homepage')

  return (
    <div className="App">
      {/* <div>{ document && (<PrismicRichText field={document.data.title} />) }</div> */}
      
      <Topbar />

      <img src={logo}  width="200px"/>

      <div id='navigation-container'>
        <Navigation id={'navigation'} />
      </div>  

      <div style={{display:'flex'}}>
        <Sidebar />
        <Products />
      </div>

    </div>
  );
}

export default App;
