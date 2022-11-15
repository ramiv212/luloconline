import React from 'react'
import { usePrismicDocumentByID } from '@prismicio/react'

function CartItem({id}) {

    let itemToAdd = usePrismicDocumentByID(id)


  return (
    <div className='cart-item' style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
        <div>
            RETSTS
        </div>
    </div>
  )
}

export default CartItem