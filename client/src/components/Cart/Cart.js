import Modal from "../UI/Modal"
import classes from './Cart.module.css'
import CartItem from "./CartItem"
import CartContext from '../../store/cart-context'
import ProductContext from "../../store/product-context"
import { useContext, useState } from 'react'
import Checkout from "./Checkout"


const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const ProductCtx = useContext(ProductContext)
  const [showCartitems, setShowCartitems] = useState(true)

  const placeOrderHandler = async (userDetails) => {
    ProductCtx.setIsLoading(true)
    const response = await fetch("https://adi36n-easy-med.herokuapp.com/orders", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer: userDetails,
        Items: cartCtx.items,
        totalAmount: cartCtx.totalAmount
      })
    })
    ProductCtx.setIsLoading(false)
    if (!response.ok) {
      alert("something went wrong")
      return
    }
    props.onClose()
    cartCtx.clearCart()
    alert("Order Placed Successfully.");
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