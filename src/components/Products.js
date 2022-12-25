import { React,useContext } from 'react';
import '../index.css';
import Product from './Product';
import { usePrismicDocumentsByType} from '@prismicio/react';
import * as prismic from '@prismicio/client'
import { ProductFilterContext } from '../ProductFilterContext';
import Sidebar from './Sidebar';
import { Container, Row } from 'react-bootstrap';
import { useParams } from "react-router-dom";

function Products() {


    const {productFilter, setProductFilter} = useContext(ProductFilterContext)

    const { id } = useParams("id");

    const [products, { state, error }] = usePrismicDocumentsByType('product',{
        predicates: [
            prismic.predicate.at('document.tags',
            // if a filter is provided in the url params then filter by param. Otherwise filter by checkboxes
            id ? [...productFilter,id] : [...productFilter])
        ]
    });


  return (
    <>
    <Sidebar filter={id} />
    <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
        <div id='qty-bar'>
            {products && <span style={{fontWeight:'700'}}>All Items ( {products.results.length} )</span>}
            {/* <span style={{float: 'right',fontWeight:'700'}}>Sort By:</span> */}
        </div>
            <Container fluid>
            {id ? <Row style={{textAlign:'center'}}>
                <h1 className='product-filter-title'>{id.toUpperCase()}</h1>
                </Row>: ''}
                <Row style={{marginTop:'46px'}}>
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