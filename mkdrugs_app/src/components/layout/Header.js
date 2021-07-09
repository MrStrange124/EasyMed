import classes from './Header.module.css'
import React from 'react'
const onLoginHandler = () => {
  alert('hello')
}
const Header = () => {
  return (
    <nav className={classes.navbar}>
      <a className={classes.navbar_brand} href="#brandname">Mk Drugs</a>
      <div className={classes.nav_container}>
        <button className={classes.btn}>My Cart <span className={classes.cart_item}>3</span> </button>
        <button className={classes.btn} onClick={onLoginHandler}>Login</button>
      </div>
    </nav>
  )
}

export default Header