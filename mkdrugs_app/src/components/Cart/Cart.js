import Modal from "../UI/Modal"
import classes from './Cart.module.css'
import CartItem from "./CartItem"
import CartContext from '../../store/cart-context'
import { useContext, useState } from 'react'
import Checkout from "./Checkout"

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const [showCart, setShowCart] = useState(true)
  console.log(cartCtx.items)
  const addToCartHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 })
  }
  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const isCartEmpty = !cartCtx.totalAmount
  const cartItems = cartCtx.items.map(item => <CartItem
    key={item.id}
    name={item.name}
    rate={item.rate}
    quantity={item.quantity}
    onAdd={addToCartHandler.bind(null, item)}
    onRemove={removeCartItemHandler.bind(null, item.id)}
  />)


  return (
    <Modal onClose={props.onClose}>
      {showCart && cartItems}
      {isCartEmpty && <h2 className={classes.empty}>Your Cart is Empty!!!</h2>}
      {!showCart && <Checkout />}
      <div className={classes.end_container}>
        {!isCartEmpty && <h2 className={classes.total}>Total: ₹{cartCtx.totalAmount}</h2>}
        <button onClick={() => props.onClose()} className={classes.close_btn}>Close</button>
        {!isCartEmpty && showCart && <button className={classes.order_btn} onClick={() => setShowCart(false)}>Order</button>}
        {!isCartEmpty && !showCart && <button className={classes.order_btn} type="submit" form="myform">Place Order</button>}
      </div>
    </Modal>
  )
}

export default Cart