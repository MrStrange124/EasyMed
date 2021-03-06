import { useReducer, useState } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0
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

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    )
    const existingCartItem = state.items[existingCartItemIndex]
    const updateTotalAmount = state.totalAmount - existingCartItem.rate
    let updatedItems
    if (existingCartItem.quantity === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    }
    else {
      const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }
    return {
      items: updatedItems,
      totalAmount: updateTotalAmount
    }
  }

  if (action.type === 'CLEAR')
    return defaultCartState

  return defaultCartState
}

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
  const [isLogin, setIsLogin] = useState(false)

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item })
  }
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id })
  }
  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' })
  }

  const loginHandler = (value) => {
    setIsLogin(value)
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    isLoggedin: isLogin,
    setLogin: loginHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider