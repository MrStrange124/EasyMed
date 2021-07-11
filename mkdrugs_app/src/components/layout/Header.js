import classes from './Header.module.css'
import React, { useState } from 'react'
import Cart from '../Cart/Cart'
import CartContext from '../../store/cart-context'
import { useContext } from 'react'

const onLoginHandler = () => {
  alert('hello')
}
const Header = () => {
  const [showCart, setShowCart] = useState(false)
  const cartCtx = useContext(CartContext)
  const totalItems = cartCtx.items.reduce((accumulator, item) => {
    return accumulator + item.quantity
  }, 0)
  return (
    <nav className={classes.navbar}>
      <a className={classes.navbar_brand} href="#brandname">Mk Drugs</a>
      <div className={classes.nav_container}>
        <button className={classes.btn} onClick={() => setShowCart(true)}>My Cart <span className={classes.cart_item}>{totalItems}</span> </button>
        <button className={classes.btn} onClick={onLoginHandler}>Login</button>
        {showCart && <Cart onClose={() => setShowCart(false)} />}
      </div>
    </nav>
  )
}

export default Header