
function returnItemQtyByID(shoppingCartState,itemID) {
    console.log(shoppingCartState)
    console.log(itemID)

    let item = shoppingCartState.find((product) => {
        return product.id === itemID
    })

    return item.qty
}

// shopping cart logic
export function addToCart(id,shoppingCartState,setShoppingCartState) {
    const productCartObject = {
        id: id,
        qty: 1,
    }

    // check if item already exists in shopping cart array
    let item = shoppingCartState.find(product => product.id === id)

   if (item) {
    // if item already exists, add one to it's qty
        let newState = [...shoppingCartState]
        newState[newState.indexOf(item)].qty ++
        setShoppingCartState(newState)
   } else {
    // if item does not exist, add it to the shopping cart array
        let newState = [...shoppingCartState,productCartObject]
        setShoppingCartState(newState)
   }

}

export function removeFromCart(id,shoppingCartState,setShoppingCartState) {
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