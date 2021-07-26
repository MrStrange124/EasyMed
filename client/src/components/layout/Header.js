import classes from './Header.module.css'
import React, { useEffect, useState } from 'react'
import Cart from '../Cart/Cart'
import CartContext from '../../store/cart-context'
import { useContext } from 'react'
import { FaCartPlus } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Header = (props) => {
  const [showCart, setShowCart] = useState(false)
  const [homeBtn, setHomeBtn] = useState(false)
  const { pathname } = useLocation()
  const [cookies, setCookie] = useCookies(['jwt'])

  useEffect(() => {
    if (pathname === '/login')
      setHomeBtn(true)
  }, [pathname])

  const cartCtx = useContext(CartContext)
  const totalItems = cartCtx.items.reduce((accumulator, item) => {
    return accumulator + item.quantity
  }, 0)

  const logoutHandler = async () => {
    setHomeBtn(false)
    const response = await fetch("http://192.168.43.249:5000/users/logout", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.jwt}`
      }
    })
    if (!response.ok) {
      console.log('something went wrong')
      return
    }
    props.setLogin()
    setCookie('jwt', '')
  }

  return (
    <nav className={classes.navbar}>
      <a className={classes.navbar_brand} href="#brandname">EasyMed</a>
      <div className={classes.nav_container}>
        <button className={classes.btn} onClick={() => setShowCart(true)}><FaCartPlus /> Cart <span className={classes.cart_item}>{totalItems}</span> </button>
        {!props.islogin &&
          <Link
            to={!homeBtn ? "/Login" : "/Home"}
            className={classes.btn}
            onClick={() => setHomeBtn(!homeBtn)
            }>{homeBtn ? "Home" : "Login"}
          </Link>}
        {props.islogin && <button className={classes.btn} onClick={logoutHandler}>Logout</button>}
        {showCart && <Cart onClose={() => setShowCart(false)} />}
      </div>
    </nav>
  )
}

export default Header