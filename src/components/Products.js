import { React,useContext } from 'react'
import '../index.css';
import Product from './Product';
import { usePrismicDocumentsByType} from '@prismicio/react';
import * as prismic from '@prismicio/client'
import { ProductFilterContext } from '../ProductFilterContext'
import Sidebar from './Sidebar';

function Products() {


    const {productFilter, setProductFilter} = useContext(ProductFilterContext)

    const [products, { state, error }] = usePrismicDocumentsByType('product',{
        predicates: [
            prismic.predicate.at('document.tags', [...productFilter])
        ]
    });


  return (
    <>
    <Sidebar />
    <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
        <div style={{width: '75%'}}>
            {products && <span style={{fontWeight:'700'}}>All Items ( {products.results.length} )</span>}
            <span style={{float: 'right',fontWeight:'700'}}>Sort By:</span>
        </div>
        <div id='products-window'>
            {products && Object.keys(products.results).map((index => {
                return <Product data={products.results[index].data} uuid={products.results[index].id} key={products.results[index].id}/>
        }))}

        </div>
    </div>
    </>
  )
}

export default Products