import { React,useContext,useState } from 'react';
import '../index.css';
import Product from './Product';
import { usePrismicDocumentsByType} from '@prismicio/react';
import * as prismic from '@prismicio/client'
import { ProductFilterContext } from '../ProductFilterContext';
import Sidebar from './Sidebar';
import { Container, Row } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import Loading from './Loading';

function Products() { 


    const {productFilter} = useContext(ProductFilterContext)

    const { id,sale } = useParams("id");

    const [orderings,setOrderings] = useState('')


    // this function will return an array of predicates with an extra predicate to filter for items on sale
    // if the param of sale in the productFilter context is set to true
    function returnPredicates(productFilter) {
        if (productFilter.sale || sale){ 
            return [
            prismic.predicate.at('document.tags',
            // if a filter is provided in the url params then filter by param. Otherwise filter by checkboxes
            id ? [...productFilter.filter,id] : [...productFilter.filter]),

            // this predicate is added to be able to filter the items that are on sale
            prismic.predicate.not('my.product.sale-price',
            0)
        ]}

        else {
            return [
                prismic.predicate.at('document.tags',
                // if a filter is provided in the url params then filter by param. Otherwise filter by checkboxes
                id ? [...productFilter.filter,id] : [...productFilter.filter]),
        ]}
    }

    const [products, { state, error }] = usePrismicDocumentsByType('product',{
        predicates: returnPredicates(productFilter),
        orderings: orderings
    });


  return (
    <>
    <Sidebar filter={id} sale={sale} />
    <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
        <div id='qty-bar'>
            {products && <span style={{fontWeight:'700'}}>All Items ( {products.results.length} )</span>}
            <span style={{float: 'right',fontWeight:'700'}}>Sort By: &nbsp;
                <select style={{borderRadius:0, 
                backgroundColor:'transparent', 
                color:'black',
                borderColor:'black'}}
                defaultValue={''}
                    onChange={(e) => {
                        console.log(e.target.value)
                            switch (e.target.value) {
                                case 'Alphabetical':
                                    setOrderings(['my.product.name'])
                                    break;
                                case 'Price: High to Low':
                                    setOrderings(['my.product.original-price desc',
                                                'my.product.sale-price desc'])
                                    break;
                                case 'Price: Low to High':
                                    setOrderings(['my.product.original-price',
                                    'my.product.sale-price'])
                                    break
                                default:
                                    setOrderings('')
                                    break;
                            }
                        }
                    }
                >
                    <option disabled={true}></option>
                    <option>Alphabetical</option>
                    <option>Price: High to Low</option>
                    <option>Price: Low to High</option>
                </select></span>
        </div>
            <Container fluid>
            {/* check if URL params have either a product type or sale */}
            {id || sale ? <Row style={{textAlign:'center'}}>
                {/* display the product type or display "sale" if params has "sale" */}
                <h1 className='product-filter-title'>{id ? id.toUpperCase() : ""}{sale ? 'On Sale' : ""}</h1>
                </Row>: ''}
                <Row style={{marginTop:'46px'}}>

                {/* render out all of the products */}
                {products && Object.keys(products.results).map((index => {
                    if (state === 'loading') return <Loading />
                    return <Product data={products.results[index].data} id={products.results[index].id} width={275} key={products.results[index].id} />
            }))}
                </Row>
            </Container>
        </div>
    </>
  )
}

export default Products