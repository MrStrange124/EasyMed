import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: item => { },
  removeItem: id => { },
  clearCart: () => { },
  isLoggedin: false,
  setLogin: bool => { }
})

export default CartContext