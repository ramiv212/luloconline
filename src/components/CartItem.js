import React from 'react'
import { usePrismicDocumentByID } from '@prismicio/react'

function CartItem({product}) {

    
    let itemObject = usePrismicDocumentByID(product.id)
    console.log(itemObject)

  return (
    <div className='cart-item' style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row',padding:'15px'}}>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'left', alignItems:'center', gap:'10px'}}>
            <img src={itemObject[0] && itemObject[0].data.image.url} style={{width:'25%'}}></img>
            <div>
                <div style={{fontWeight:'600'}}>{itemObject[0] && itemObject[0].data.name[0].text}</div>
                <div>Qty: + {product.qty} -</div>
            </div>
        </div>
    </div>
  )
}

export default CartItem