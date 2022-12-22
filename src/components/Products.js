import { React,useContext, useState } from 'react';
import '../index.css';
import Product from './Product';
import { usePrismicDocumentsByType} from '@prismicio/react';
import * as prismic from '@prismicio/client'
import { ProductFilterContext } from '../ProductFilterContext';
import Sidebar from './Sidebar';
import { Container, Row } from 'react-bootstrap';

function Products() {


    const {productFilter, setProductFilter} = useContext(ProductFilterContext)
    const [rowCounter, setRowCounter ] = useState(0)

    const [products, { state, error }] = usePrismicDocumentsByType('product',{
        predicates: [
            prismic.predicate.at('document.tags', [...productFilter])
        ]
    });


  return (
    <>
    <Sidebar />
    <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
        <div id='qty-bar'>
            {products && <span style={{fontWeight:'700'}}>All Items ( {products.results.length} )</span>}
            {/* <span style={{float: 'right',fontWeight:'700'}}>Sort By:</span> */}
        </div>
            <Container fluid>
                <Row>
                    {console.log(products && products.results)}
                {products && Object.keys(products.results).map((index => {
                    return <Product data={products.results[index].data} id={products.results[index].id} width={275} key={products.results[index].id} />
            }))}
                </Row>
            </Container>
        </div>
    </>
  )
}

export default Products