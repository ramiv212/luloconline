import "./index.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ProductFilterContext } from "./ProductFilterContext";
import { ShoppingCartContext } from "./ShoppingCartContext";
import Topbar from "./components/Topbar";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ErrorPage from "./components/ErrorPage";
import ProductPage from "./components/ProductPage";
import Checkout from "./components/Checkout";
import Success from "./components/Success";
import Footer from "./components/Footer"
const logo = require("./images/LuloC_logo_webp.webp");

// TODOS
// Make the error page pretty
// add animations to loading
// add fade-in to items
// add hover animation to items like cart, checkboxes,etc
// responsive
// image alts and tooltips for some things?
// reviews?
// logo link to homepage
// make a payment completion page
// creams and oils filters don't work
// make a filter for sale items

function App() {
  const [productFilter, setProductFilter] = useState([]);
  const [shoppingCartState, setShoppingCartState] = useState([]);
  const [appOverlayState, setAppOverlayState] = useState(false);

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

          <img src={logo} width="200px" alt="LuloCo Online" />

          <div id="navigation-container">
            <Navigation id={"navigation"} />
          </div>

          <Cart
            appOverlayState={appOverlayState}
            setAppOverlayState={setAppOverlayState}
            shoppingCartState={shoppingCartState}
          />

          <div style={{ display: "flex", width: "100%" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductPage />} />

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
