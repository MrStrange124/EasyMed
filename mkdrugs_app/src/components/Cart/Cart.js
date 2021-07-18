import Modal from "../UI/Modal"
import classes from './Cart.module.css'
import CartItem from "./CartItem"
import CartContext from '../../store/cart-context'
import { useContext, useState } from 'react'
import Checkout from "./Checkout"

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const [showCartitems, setShowCartitems] = useState(true)

  const placeOrderHandler = (userDetails) => {
    const order = {
      customer: userDetails,
      items: cartCtx.items,
      totalAmount: cartCtx.totalAmount
    }
    console.log(order)
    alert("Order Placed Successfully.");
    props.onClose()
    cartCtx.clearCart()
  }

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
      {showCartitems && cartItems}

      {isCartEmpty && <div className={classes.empty}>
        <h2 >Your Cart is Empty!</h2>
        <p>Add items to it now.</p>
      </div>}

      {!showCartitems && <Checkout placeOrder={placeOrderHandler} />}
      <div className={classes.end_container}>
        {!isCartEmpty && <h2 className={classes.total}>Total: ₹{cartCtx.totalAmount}</h2>}
        {showCartitems && <button onClick={() => props.onClose()} className={classes.close_btn}>Close</button>}
        {!showCartitems && <button onClick={() => setShowCartitems(true)} className={classes.close_btn}>Back</button>}
        {!isCartEmpty && showCartitems && <button className={classes.order_btn} onClick={() => setShowCartitems(false)}>Order</button>}
        {!isCartEmpty && !showCartitems && <button className={classes.order_btn} type="submit" form="myform">Place Order</button>}
      </div>
    </Modal>
  )
}

export default Cart