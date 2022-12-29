import { React,useState,useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ShoppingCartContext } from '../ShoppingCartContext';
import { addToCart,returnCartQtyFromID,usFormatter } from '../helperFunctions'

function Product( {data,id,width} ) {

    // const products = useAllPrismicDocumentsByType('product')

    const [toggleCollapse, setToggleCollapse] = useState(false)
    const [cartQtyState,setCartQtyState] = useState(null)

    const { shoppingCartState,setShoppingCartState } = useContext(ShoppingCartContext)

    const mediaQuery = window.matchMedia('(min-width: 991px)')
    
    
    useEffect(() => {
      shoppingCartState && setCartQtyState(returnCartQtyFromID(shoppingCartState,id))
    }, [id,shoppingCartState])

    let navigate = useNavigate(); 
    const productPageRoute = () =>{ 
      let path = `/products/${id}`; 
      navigate(path);
  }
    

  return (
    <Card style={{width: `${width}px`}} className={'product-card'}
        // fade-in and out animation for 'add to cart' button. If media query is larger than
        // 991px then animation is not added and button stays solid
        // it remains solid because there is a css media query that sets it to transparency:1 !important;
        onMouseEnter={() => { if(mediaQuery.matches) setToggleCollapse('animate-bottom')}}
        onMouseLeave={() => { if(mediaQuery.matches) setToggleCollapse('animate-away')}}>
        
        <Button 
        
        className={`
        ${(data.outofstock) ? 'bg-secondary' : ''}  product-page-button ${cartQtyState ? 'bg-danger' : ''}
        product-card-button 
        ${toggleCollapse} 
        ${cartQtyState ? 'bg-danger' : ''}
        `}

        style={{backgroundColor: 'rgb(64,124,81)',position:'absolute', width:'100%', height:'35px',top:`${width - 35}px`,opacity:0 }}
        onClick={()=> {
            addToCart(id,shoppingCartState,setShoppingCartState,1)}}
        disabled={data.outofstock}>
            {data.outofstock ? <>Out Of Stock</> : <>{cartQtyState ? <>Added To Cart (&nbsp;{cartQtyState}&nbsp;)</> : <>Add To Cart</>}</>}
        </Button>
        <Card.Img variant="top" src={data.image.url} className="card-image" onClick={productPageRoute} alt={data.name[0].text} />
        
        {data.isnew ? <div className='new-box'>New</div> : ""}
        {data['sale-price'] ? <div className='sale-box'>Sale!</div> : ""}
          <Card.Body style={{height:'100px',cursor:'pointer'}} onClick={productPageRoute}>
              <Card.Title className='product-title' style={{fontWeight: "400"}}>{data.name[0].text}</Card.Title>

              <Card.Text className='product-prices'><span>

                  {data['original-price'] && data['sale-price']  ? <> <span style={{textDecoration: 'line-through'}}>{usFormatter.format(data['original-price'])}</span> | </> : 
                  <span style={{fontWeight: '600',fontSize: '110%'}}>{usFormatter.format(data['original-price'])}</span>
                  }

                  </span>
                  <span style={{fontWeight: '600',fontSize: '110%'}}>
                      { data['sale-price'] !== null ? usFormatter.format(data['sale-price']) : "" }
                  </span>
                  </Card.Text>
                  
          </Card.Body>
    </Card>
  )
}

export default Product