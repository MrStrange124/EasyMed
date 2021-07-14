import classes from './Header.module.css'
import React, { useState } from 'react'
import Cart from '../Cart/Cart'
import CartContext from '../../store/cart-context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [showCart, setShowCart] = useState(false)
  const [btnText, setBtnText] = useState("Login")

  const toggleBtn = () => {
    if (btnText === "Login")
      setBtnText("Home")
    else
      setBtnText("Login")
  }

  const cartCtx = useContext(CartContext)
  const totalItems = cartCtx.items.reduce((accumulator, item) => {
    return accumulator + item.quantity
  }, 0)
  return (
    <nav className={classes.navbar}>
      <a className={classes.navbar_brand} href="#brandname">Mk Drugs</a>
      <div className={classes.nav_container}>
        <button className={classes.btn} onClick={() => setShowCart(true)}>My Cart <span className={classes.cart_item}>{totalItems}</span> </button>
        <Link to={btnText === "Login" ? "login" : ""} className={classes.btn} onClick={toggleBtn}>{btnText}</Link>
        {showCart && <Cart onClose={() => setShowCart(false)} />}
      </div>
    </nav>
  )
}

export default Header