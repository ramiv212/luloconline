import { React,useState } from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Fade from 'react-bootstrap/Collapse'
import { PrismicRichText } from '@prismicio/react';

function Product( {data,uuid} ) {

    const [toggleCollapse, setToggleCollapse] = useState(false)

  return (
    <Card style={{width: '14rem'}} className={'product-card'} 
        onMouseEnter={() => {
            setToggleCollapse(!toggleCollapse)
    }}
        onMouseLeave={() => {
            setToggleCollapse(!toggleCollapse)
        }}
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
        {/* <Fade in={toggleCollapse}> */}
            <Button className={`product-card-button`} style={{bacgroundColor: 'rgb(64,124,81)'}}>Add To Cart</Button>
        {/* </Fade> */}
    </Card>
  )
}

export default Product