import React from 'react'
import '../index.css';
import Product from './Product';
import { usePrismicDocumentsByType} from '@prismicio/react';


function Products() {

const [products, { state, error }] = usePrismicDocumentsByType('product');

    console.log(products)

  return (
    <div style={{display:'flex', flexDirection:'column'}}>
        <div style={{width: '75%'}}>
            <span style={{fontWeight:'700'}}>All Items ( 99 )</span>
            <span style={{float: 'right',fontWeight:'700'}}>Sort By:</span>
        </div>
        <div id='products-window'>
            {products && Object.keys(products.results).map((index => {
                return <Product data={products.results[index].data} uuid={products.results[index].id} key={products.results[index].id}/>
        }))}

        </div>
    </div>
  )
}

export default Products