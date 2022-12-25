import { React, useState, useContext, useEffect } from "react";
import { usePrismicDocumentByID,PrismicRichText } from "@prismicio/react";
import { Container,Row,Col,Image } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import { usFormatter } from '../helperFunctions'
import { addToCart,returnCartQtyFromID } from '../helperFunctions'
import { ShoppingCartContext } from '../ShoppingCartContext';

function ProductPage() {
  const { id } = useParams("id");
  const [product] = usePrismicDocumentByID(id);

  const [cartQtyState,setCartQtyState] = useState(null)
  const { shoppingCartState,setShoppingCartState } = useContext(ShoppingCartContext)

  const [dropdownValue,setDropdownValue] = useState(null)

  useEffect(() => {
    shoppingCartState && setCartQtyState(returnCartQtyFromID(shoppingCartState,id))
  }, [id,shoppingCartState])


  return (
    <Container fluid style={{width:'90%',paddingTop:'25px',paddingBottom:'25px'}}>
      <Row>
        <Col lg={6} style={{padding:'25px',display:'flex',justifyContent:'center',alignItems:'center'}}>
        {/* product image */}
        <div>
          <Image
            src={product && product.data.image.url}
            alt={product && product.data.name[0].text}
            fluid
          />
        </div>
      </Col>

      <Col lg={6} style={{padding:'25px',display:'flex',justifyContent:'center',alignItems:'center'}}>

        {/* product title */}
            <div style={{width:'100%', margin:'auto', display: "flex", flexDirection: "column", alignItems:'center',justifyContent:'center'}}>
              <h2>{product && product.data.name[0].text}</h2>
              {product && product.data["sale-price"] ? <span style={{display:'flex', alignItems:'center',justifyContent:'center'}}>  
                <span
                    className="text-danger"
                    style={{
                    fontWeight: "lighter",
                    fontSize: "150%",
                    textDecoration: "line-through",
                    margin: '10px'
                    }}>
                        
                    {product && usFormatter.format(product.data["original-price"])}

                </span>
                <span style={{
                    margin: '10px',
                    fontSize: '175%',
                }}>
                    {product &&
                    product.data["sale-price"] &&
                    usFormatter.format(product.data["sale-price"])}
                </span>
              </span> : 
                    <span style={{width:'100%',display:'flex', alignItems:'center',justifyContent:'center'}}>
                        <span style={{
                            fontSize: '175%',
                            margin:'auto',
                        }}>
                            {product &&
                            product.data["original-price"] &&
                            usFormatter.format(product.data["original-price"])}
                        </span>
                    </span>
              }
                <Container style={{paddingTop:'20px',width:'inherit',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Row style={{width:'90%'}}>
                    <Col xl={4} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px',marginBottom:'20px'}}>
                    <select id='qty-dropdown' name='qty'
                    onChange={(e) => {setDropdownValue(e.target.value)} }>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                    </select>
                    </Col>

                    <Col xl={8} style={{display:'flex', justifyContent:'end'}}>
                      <button className ={`product-page-button ${cartQtyState ? 'bg-danger' : ''}`} style={{width:'100%', marginLeft:'auto',right:0,marginTop:'20px',marginBottom:'20px'}}
                      onClick={()=> {
                        addToCart(id,shoppingCartState,setShoppingCartState,parseInt(dropdownValue))
                    }}>
                        { cartQtyState ? <>Added To Cart (&nbsp;{cartQtyState}&nbsp;)</> : <>Add To Cart</>}</button>
                    </Col>
                  </Row>
                </Container>

              <div style={{paddingTop:'20px',paddingBottom:'20px', width:'80%'}}>
                {product && <PrismicRichText field={product.data.description} />}
              </div>
            </div>
      </Col>
    </Row>
    </Container>
  );
}

export default ProductPage;
