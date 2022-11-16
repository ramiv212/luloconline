import { React,useState,useContext } from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Fade from 'react-bootstrap/Collapse'
import { ShoppingCartContext } from '../ShoppingCartContext';
import { useAllPrismicDocumentsByType } from '@prismicio/react';
import { addToCart } from '../helperFunctions'

function Product( {data,id} ) {

    const products = useAllPrismicDocumentsByType('product')

    const [toggleCollapse, setToggleCollapse] = useState(false)

    const { shoppingCartState,setShoppingCartState } = useContext(ShoppingCartContext)


  return (
    <Card style={{width: '14rem'}} className={'product-card'}>

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
        {/* <Fade in={toggleCollapse}> */}
            <Button className={`product-card-button`} 
                    style={{bacgroundColor: 'rgb(64,124,81)'}}
                    onClick={()=> {
                        addToCart(id,shoppingCartState,setShoppingCartState)
                    }}>Add To Cart</Button>
        {/* </Fade> */}
    </Card>
  )
}

export default Product