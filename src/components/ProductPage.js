import React from 'react'
import { usePrismicDocumentByID } from '@prismicio/react';
import { useParams } from 'react-router-dom';

function ProductPage() {

    const { id } = useParams('id')
    const [product, { state, error }] = usePrismicDocumentByID(id);

    product && console.log(product)

  return (
    <div style={{height:'calc(100vH - 200px)',width:'100vw', display:'flex',justifyContent:'center', alignItems:'center'}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly',width:'80%',height:'90%'}}>

            {/* product image */}
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly',width:'50%',height:'85%', margin:'auto'}}>
                <img src={product && product.data.image.url} />
            </div>

            {/* product */}
            <div style={{display:'flex', flexDirection:'column', justifyContent:'start',alignItems:'center',height:'85%',width:'50%', margin:'auto'}}>
                <h2>
                    {product && product.data.name[0].text}

                </h2>

                <div style={{display:'flex', flexDirection:'row'}}>
                    <div>
                        {product && product.data['original-price']}
                        {product && product.data['sale-price'] && product.data['sale-price']}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductPage