import classes from './Header.module.css'
import React, { useEffect, useState } from 'react'
import Cart from '../Cart/Cart'
import CartContext from '../../store/cart-context'
import { useContext } from 'react'
import { FaCartPlus } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [showCart, setShowCart] = useState(false)
  const [homeBtn, setHomeBtn] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/login')
      setHomeBtn(true)
  }, [pathname])

  const cartCtx = useContext(CartContext)
  const totalItems = cartCtx.items.reduce((accumulator, item) => {
    return accumulator + item.quantity
  }, 0)
  return (
    <nav className={classes.navbar}>
      <a className={classes.navbar_brand} href="#brandname">EasyMed</a>
      <div className={classes.nav_container}>
        <button className={classes.btn} onClick={() => setShowCart(true)}><FaCartPlus /> Cart <span className={classes.cart_item}>{totalItems}</span> </button>
        <Link
          to={!homeBtn ? "/login" : "/"}
          className={classes.btn}
          onClick={() => setHomeBtn(!homeBtn)
          }>{homeBtn ? "Home" : "Login"}
        </Link>
        {showCart && <Cart onClose={() => setShowCart(false)} />}
      </div>
    </nav>
  )
}

export default Header