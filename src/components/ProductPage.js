import { React, useState, useContext, useEffect } from "react";
import { usePrismicDocumentByID,PrismicRichText } from "@prismicio/react";
import { Container,Row,Col,Image,Button } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import { usFormatter } from '../helperFunctions'
import { addToCart,returnCartQtyFromID } from '../helperFunctions'
import { ShoppingCartContext } from '../ShoppingCartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarHollow } from '@fortawesome/free-regular-svg-icons'
import Review from "./Review";
import Addreview from "./Addreview";
import { Collapse } from 'react-collapse';

function ProductPage() {
  const { id } = useParams("id");
  const [product] = usePrismicDocumentByID(id);

  const [thisProductReviews, setThisProductReviews] = useState([])
  const [starsArray,setStarsArray] = useState([])

  const [addReviewIsOpened,setAddReviewIsOpened] = useState(false)

  useEffect(()=> {

    let numberOfStars = []

    function handleErrors(response) {
      if (!response.ok) {
          console.log(response.statusText);
      }
      return response;
    }
    
    try {
    // query the json file on the server for the reviews for this product
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(handleErrors)
    .then((response) => response.json())
    .then((data)=> {
      // add up the ratings from all reviews and divide by number of reviews
      const productReviews = data
      
      let averageRating = Math.floor(( productReviews.reduce((a,b) => a + parseInt(b.rating),0) ) / productReviews.length)

      // get the state of the average of the ratings and render that as an array of star objects
    // in the starsArray state
    for (let i = 0; i < 5; i++) {
      if (i < averageRating){
        numberOfStars.push(<FontAwesomeIcon icon={faStar} className={'review-star'} />)
      } else {
        numberOfStars.push(<FontAwesomeIcon icon={faStarHollow} className={'review-star'} />)
      }
    }

      setStarsArray(numberOfStars)
      setThisProductReviews(productReviews)

    })
    .catch((error) => {
      console.error(error)
    })
  } catch (error) {
    console.log(error.message)
  }

  },[])

  const [cartQtyState,setCartQtyState] = useState(null)
  const { shoppingCartState,setShoppingCartState } = useContext(ShoppingCartContext)

  const [dropdownValue,setDropdownValue] = useState(1)

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
          
          <div id="write-review-desktop">
            <div style={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              flexDirection:'column',
              marginTop:'50px'
            }}>
              <Button style={{marginBottom:'20px', width:'60%'}}
                      type="button"
                      className='product-card-button'
                      onClick={() => setAddReviewIsOpened(!addReviewIsOpened)}>Click here to write a review</Button>

              <Collapse isOpened={addReviewIsOpened} theme={{collapse: 'ReactCollapse--collapse'}}>
                <Addreview productID={id} id="add-review" className="collapse in" />
              </Collapse>
            </div>
          </div>

        </div>
      </Col>

      <Col lg={6} style={{padding:'25px',display:'flex'}}>

        {/* product title */}
            <div style={{width:'100%',display: "flex", flexDirection: "column", alignItems:'center',justifyContent:'start'}}>
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
              <span>
                {/* render number of stars based on the score in prismic */}
                {thisProductReviews.length > 0 ?<>{
                  starsArray.map((star,index) => <span key={index}>{star}</span>)
                }</> : ""} &nbsp;&nbsp;
                {thisProductReviews.length} ratings
              </span>
                {/* add to cart section */}
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
                      <button className ={`${product && (product.data.outofstock) ? 'bg-secondary' : ''}  product-page-button ${cartQtyState ? 'bg-danger' : ''}`} 
                      style={{width:'100%', 
                      height:'40px', 
                      marginLeft:'auto',
                      right:0,marginTop:'20px',
                      marginBottom:'20px',
                      backgroundColor:'rgb(153,164,130)'
                    }}

                      onClick={()=> {
                        addToCart(id,shoppingCartState,setShoppingCartState,parseInt(dropdownValue))}}
                        disabled={product && product.data.outofstock}>
                        {product && (!product.data.outofstock) ? <>{ cartQtyState ? <>Added To Cart (&nbsp;{cartQtyState}&nbsp;)</> : <>Add To Cart</>}</> : <>Out Of Stock</>}</button>
                    </Col>
                  </Row>
                </Container>

              <div style={{paddingTop:'20px',paddingBottom:'20px', width:'80%'}}>
                {product && <PrismicRichText field={product.data.description} />}

                <p style={{fontWeight:'700',marginRight:'auto'}}>Reviews</p>
            
                  {/* If there are no reviews inside of the set, display a message. */}
                  {thisProductReviews.length !== 0 ?
                    <>{thisProductReviews && Array.from(thisProductReviews).map((review,index) => {
                    // console.log(Array.from(thisProductReviews))
                    {
                    return <Review style={{width:'100%'}}
                      review={review}
                      key={index}
                      />
                    }})
              }</> : <span className="text-secondary">There are no reviews for this item yet.</span>}
              </div>
            </div>
      </Col>
    </Row>

    <Row>
      <Col>
        <div id="write-review-mobile">
            <div style={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              flexDirection:'column',
            }}>
              <Button style={{marginBottom:'20px', width:'60%',height:'40px'}}
                      type="button"
                      className='product-card-button'
                      onClick={() => setAddReviewIsOpened(!addReviewIsOpened)}>Click here to write a review</Button>

              <Collapse isOpened={addReviewIsOpened} theme={{collapse: 'ReactCollapse--collapse'}}>
                <Addreview productID={id} id="add-review" className="collapse in" />
              </Collapse>
            </div>
          </div>
      </Col>
    </Row>
    </Container>
  );
}

export default ProductPage;
