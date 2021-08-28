import classes from './Header.module.css'
import React, { useEffect, useState } from 'react'
import Cart from '../Cart/Cart'
import CartContext from '../../store/cart-context'
import { useContext } from 'react'
import { FaCartPlus } from 'react-icons/fa';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import ProductContext from '../../store/product-context'

const Header = () => {
  const [showCart, setShowCart] = useState(false)
  const [homeBtn, setHomeBtn] = useState(false)
  const [orderBtn, setOrderBtn] = useState(false)
  const productCtx = useContext(ProductContext)
  const { pathname } = useLocation()
  const history = useHistory()
  const [cookies, setCookie] = useCookies(['jwt'])

  useEffect(() => {
    if (pathname === '/admin/products')
      setOrderBtn(true)
    else
      setOrderBtn(false)
  }, [pathname])

  const cartCtx = useContext(CartContext)
  const totalItems = cartCtx.items.reduce((accumulator, item) => {
    return accumulator + item.quantity
  }, 0)

  const logoutHandler = async () => {
    setHomeBtn(false)
    productCtx.setIsLoading(true)
    const response = await fetch("http://localhost:5000/users/logout", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.jwt}`
      }
    })
    productCtx.setIsLoading(false)
    if (!response.ok) {
      console.log('something went wrong')
      return
    }
    cartCtx.setLogin(false)
    setCookie('jwt', '', { path: '/' })
    history.push('/Home')
  }

  return (
    <nav className={classes.navbar}>
      <a className={classes.navbar_brand} href="#brandname">EasyMed</a>
      <div className={classes.nav_container}>
        {!cartCtx.isLoggedin && <button className={classes.btn} onClick={() => setShowCart(true)}><FaCartPlus /> Cart <span className={classes.cart_item}>{totalItems}</span> </button>}
        {!cartCtx.isLoggedin &&
          <Link
            to={!homeBtn ? "/Login" : "/Home"}
            className={classes.btn}
            onClick={() => setHomeBtn(!homeBtn)
            }>{homeBtn ? "Home" : "Login"}
          </Link>}
        {cartCtx.isLoggedin && <button className={classes.btn} onClick={logoutHandler}>Logout</button>}
        {cartCtx.isLoggedin &&
          <Link
            to={!orderBtn ? "/admin/products" : "/admin/orders"}
            className={classes.btn}
            onClick={() => setOrderBtn(!orderBtn)
            }>{orderBtn ? "Orders" : "Products"}
          </Link>}
        {showCart && <Cart onClose={() => setShowCart(false)} />}
      </div>
    </nav>
  )
}

export default Header