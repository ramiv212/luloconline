
export const usFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  

function returnItemQtyByID(shoppingCartState,itemID) {
    let item = shoppingCartState.find((product) => {
        return product.id === itemID
    })

    return item.qty
}

// shopping cart logic
export function addToCart(id,shoppingCartState,setShoppingCartState,qty) {
    
    const productCartObject = {
        id: id,
        qty: 0,
    }

    if (qty) {
        productCartObject.qty = qty
    }

    // check if item already exists in shopping cart array
    let item = shoppingCartState.find(product => product.id === id)

   if (item) {
    // if item already exists, add one to it's qty
        let newState = [...shoppingCartState]
        console.log(newState[newState.indexOf(item)])
        if (qty) {
            newState[newState.indexOf(item)].qty += qty
        } else {
            newState[newState.indexOf(item)].qty ++
        }
        setShoppingCartState(newState)
   } else {
    // if item does not exist, add it to the shopping cart array
        let newState = [...shoppingCartState,productCartObject]
        setShoppingCartState(newState)
   }

}

export function decrementFromCart(id,shoppingCartState,setShoppingCartState) {
    // this object is to be added to the state if it is not in the state
    const productCartObject = {
        id: id,
        qty: 1,
    }
    
    // check if item already exists in shopping cart array
    let item = shoppingCartState.find(product => product.id === id)


   if (item && item.qty > 0) {
    // if item already exists, remove one from it's qty
        let newState = [...shoppingCartState]
        let itemQty = newState[newState.indexOf(item)].qty

        if ( itemQty > 0 ) {newState[newState.indexOf(item)].qty --}
        setShoppingCartState(newState)
   }
    
   // if item qty reaches less than 1, remove item from state
   if ( returnItemQtyByID(shoppingCartState,id) < 1 ) {
        let arrayWithoutItemObject = shoppingCartState.filter((product) => {
            return product.id !== item.id
        })
        let newState = [...arrayWithoutItemObject]
        setShoppingCartState(newState)
    }
}


export function removeFromCart(id,shoppingCartState,setShoppingCartState) {
    // check if item already exists in shopping cart array
    let item = shoppingCartState.find(product => product.id === id)

        // remove from cart
        let arrayWithoutItemObject = shoppingCartState.filter((product) => {
            return product.id !== item.id
        })
        let newState = [...arrayWithoutItemObject]
        setShoppingCartState(newState)
}


function returnPriceFromProduct(productObject,cartProducts) {
    let product = cartProducts && cartProducts.find((product) => {
        return product.id === productObject.id
    })

    if (product && product.data['sale-price']) return product.data['sale-price'] * productObject.qty
    if (product && product.data['original-price']) return product.data['original-price'] * productObject.qty
}


function returnFullPriceFromProduct(productObject,cartProducts) {
    let product = cartProducts && cartProducts.find((product) => {
        return product.id === productObject.id
    })

    if (product && product.data['original-price']) return product.data['original-price'] * productObject.qty
}


export function returnCartTotal(shoppingCartState,cartProducts) {
    if (cartProducts) {
        let sum = shoppingCartState.reduce((previousValue,nextValue) => previousValue + returnPriceFromProduct(nextValue,cartProducts), 0)
        
        if (!isNaN(sum)) return sum
    }
}


export function returnFullCartTotal(shoppingCartState,cartProducts) {
    if (cartProducts) {
        let sum = shoppingCartState.reduce((previousValue,nextValue) => previousValue + returnFullPriceFromProduct(nextValue,cartProducts), 0)
        
        if (!isNaN(sum)) return sum
    }
}


export function returnCartItemPrice(itemObject,product) {
    // console.log(itemObject)
    // console.log(product)
    let salePrice = itemObject[1].state === 'loaded' && itemObject[0].data['sale-price'] * product.qty
    let originalPrice = itemObject[1].state === 'loaded' && itemObject[0].data['original-price'] * product.qty
    return {salePrice: salePrice, originalPrice: originalPrice}
}


export function returnCartQtyFromID(shoppingCartState,id) {
    if (!shoppingCartState) return
    let item = shoppingCartState.find(product => product.id === id)
    // item && console.log(item.qty)
    if (item) return item.qty
}