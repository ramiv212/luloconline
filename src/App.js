import "./index.css";
import { useState } from "react";
import { Routes, Route,useNavigate } from "react-router-dom";
import { ProductFilterContext } from "./ProductFilterContext";
import { ShoppingCartContext } from "./ShoppingCartContext";
import useLocalStorage from "./useLocalStorage";
import Topbar from "./components/Topbar";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ErrorPage from "./components/ErrorPage";
import ProductPage from "./components/ProductPage";
// import Checkout from "./components/Checkout";
import Success from "./components/Success";
import Footer from "./components/Footer"
import Learn from "./components/Learn";
import Mission from "./components/Mission";
import Policies from "./components/Policies";
import Contact from "./components/Contact";
const logo = require("./images/LuloC_logo_png.png");

// TODOS
// Make the error page pretty
// add animations to loading
// add fade-in to items
// add hover animation to items like cart, checkboxes,etc
// reviews?
// logo link to homepage
// creams and oils filters don't work
// out of stock option in prismic that greys out add to cart buttons
// if product or filter don't exist, don't do anything

function App() {

  const [productFilter, setProductFilter] = useState([]);
  const [shoppingCartState,setShoppingCartState] = useLocalStorage('cartState',[]);
  const [appOverlayState, setAppOverlayState] = useState(false);

  const navigate = useNavigate()

  return (
    <div className="App">
      <ShoppingCartContext.Provider
        value={{
          shoppingCartState,
          setShoppingCartState,
          appOverlayState,
          setAppOverlayState,
        }}
      >
        <ProductFilterContext.Provider
          value={{ productFilter, setProductFilter }}
        >
          {/* <div>{ document && (<PrismicRichText field={document.data.title} />) }</div> */}

          <Topbar />

          <img src={logo} width="200px" alt="LuloCo Online" onClick={() => {navigate('/home')}} style={{cursor:'pointer',paddingTop:'25px'}} />

          <div id="navigation-container">
            <Navigation id={"navigation"} />
          </div>

          <Cart
            appOverlayState={appOverlayState}
            setAppOverlayState={setAppOverlayState}
            shoppingCartState={shoppingCartState}
            setShoppingCartState={setShoppingCartState}
          />

          <div style={{ display: "flex", width: "100%" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/products/filter/:id" element={<Products />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/contact" element={<Contact />} />

              {/* <Route path="/checkout" element={<Checkout 
                shoppingCartState={shoppingCartState}
                appOverlayState={appOverlayState}
                setAppOverlayState={setAppOverlayState}
                 />} /> */}

              <Route path="/success" element={<Success />} />
              <Route path="*" element={<ErrorPage />} />
              {/* TODO fix this later */}
            </Routes>
          </div>
          <Footer />
        </ProductFilterContext.Provider>
      </ShoppingCartContext.Provider>
    </div>
  );
}

export default App;
