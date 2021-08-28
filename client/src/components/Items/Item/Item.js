import classes from './Item.module.css'
import React from "react";
import CartContext from '../../../store/cart-context.js'
import { useContext, useRef } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

const Item = (props) => {
  const percentage = Math.floor((props.price - props.rate) / props.price * 100)
  const cartCtx = useContext(CartContext)
  const inputRef = useRef()

  const addToCartHandler = (value) => {
    if (value > 1000 || value < 0)
      return
    const quantity = value ? value : 1
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      quantity,
      rate: props.rate
    })
  }
  return (
    <li className={classes.item}>
      <div className={classes.product_details}>
        <h3 className={classes.name}>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <span className={classes.rate}>₹{props.rate}</span>
        <span className={classes.price}>₹{props.price}</span>
        <span className={classes.percentage}>{percentage}% off</span>
      </div>

      {!cartCtx.isLoggedin && <div className={classes.item_foam}>
        <input
          type="number"
          className={classes.input}
          min='1'
          max='1000'
          placeholder="1"
          ref={inputRef}
        />
        <button className={classes.add_btn} onClick={() => addToCartHandler(+inputRef.current.value)} >Add to Cart</button>
      </div>
      }
      {
        cartCtx.isLoggedin &&
        <div className={classes.item_foam}>
          <FaEdit className={classes.edit} onClick={props.onEdit} />
          <FaTrashAlt className={classes.delete} onClick={props.onDelete} />
        </div>
      }
    </li>
  )
}

export default Item