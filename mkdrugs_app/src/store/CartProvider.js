import { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmout: 0
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updateTotalAmount = state.totalAmount + action.item.rate * action.item.quantity;
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
    const existingCartItem = state.items[existingCartItemIndex]
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    else {
      updatedItems = state.items.concat(action.item)
    }
    return {
      items: updatedItems,
      totalAmount: updateTotalAmount
    }
  }
}

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item })
  }
  const removeItemFromCartHandler = () => { }
  const clearCartHandler = () => { }

  const cartContext = {
    items: cartState.items,
    totalAmout: cartState.totalAmout,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider