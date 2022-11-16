import { React,useState,useContext,useEffect } from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ShoppingCartContext } from '../ShoppingCartContext';
import { addToCart,returnCartQtyFromID } from '../helperFunctions'

function Product( {data,id} ) {

    console.log(id)

    // const products = useAllPrismicDocumentsByType('product')

    const [toggleCollapse, setToggleCollapse] = useState(false)
    const [cartQtyState,setCartQtyState] = useState(null)

    const { shoppingCartState,setShoppingCartState } = useContext(ShoppingCartContext)
    
    useEffect(() => {
      shoppingCartState && setCartQtyState(returnCartQtyFromID(shoppingCartState,id))
    }, [id,shoppingCartState])
    

  return (
    <Card style={{width: '14rem'}} className={'product-card'}
        onMouseEnter={() => {setToggleCollapse('animate-bottom')}}
        onMouseLeave={() => {setToggleCollapse('animate-away')}}
    >

        <Card.Img variant="top" src={data.image.url} className="card-image" />

        {data.isnew ? <div className='new-box'>New</div> : ""}
        {data['sale-price'] ? <div className='sale-box'>Sale!</div> : ""}

        <Card.Body style={{height:'100px'}}>
            <Card.Title className='product-title' style={{fontWeight: "400"}}>{data.name[0].text}</Card.Title>
            <Card.Text className='product-prices'><span>

                {data['original-price'] && data['sale-price']  ? <> <span style={{textDecoration: 'line-through'}}>$ {data['original-price']}</span> | </> : 
                <span style={{fontWeight: '600',fontSize: '110%'}}>${data['original-price']}</span>
                }

                </span>
                <span style={{fontWeight: '600',fontSize: '110%'}}>
                    { data['sale-price'] !== null ? '$' + data['sale-price'] : "" }
                </span>
                </Card.Text>
        </Card.Body>
            <Button className={`product-card-button ${toggleCollapse} ${cartQtyState ? 'bg-danger' : ''}`} 
                    style={{bacgroundColor: 'rgb(64,124,81)'}}
                    onClick={()=> {
                        addToCart(id,shoppingCartState,setShoppingCartState)
                    }}>
                        { cartQtyState ? <>Added To Cart (&nbsp;{cartQtyState}&nbsp;)</> : <>Add To Cart</>}
                </Button>
    </Card>
  )
}

export default Product