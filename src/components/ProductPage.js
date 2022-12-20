import React from "react";
import { usePrismicDocumentByID,PrismicRichText } from "@prismicio/react";
import { useParams } from "react-router-dom";
import { usFormatter } from '../helperFunctions'

function ProductPage() {
  const { id } = useParams("id");
  const [product] = usePrismicDocumentByID(id);

  product && console.log(product);

  return (
    <div
      style={{
        height: "calc(100vH - 200px)",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "80%",
          height: "90%",
        }}
      >
        {/* product image */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "50%",
            height: "85%",
            margin: "auto",
          }}
        >
          <img
            src={product && product.data.image.url}
            alt={product && product.data.name[0].text}
          />
        </div>

        {/* product title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            height: "85%",
            width: "50%",
            margin: "auto",
          }}
        >
          <h2>{product && product.data.name[0].text}</h2>

          <div style={{ display: "flex", flexDirection: "row", alignItems:'center' }}>
            <div style={{width:'80%', margin:'auto'}}>
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
                <div>
                    <select id='qty-dropdown' name='qty'>
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

                    <button className="product-card-button"> Add To Cart</button>

                </div>

              <div style={{paddingTop:'20px',paddingBottom:'20px'}}>
                {product && <PrismicRichText field={product.data.description} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
