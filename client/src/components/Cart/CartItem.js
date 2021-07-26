import classes from './CartItem.module.css'

const CartItem = (props) => {

  return (
    <li className={classes.container}>
      <div className={classes.item}>
        <h3>{props.name}</h3>
        <div className={classes.price}>
          <p className={classes.rate}>₹{props.rate}</p>
          <span className={classes.quantity}>x {props.quantity}</span>
          <p className={classes.subtotal}>Subtotal: ₹{props.rate * props.quantity}</p>
        </div>
      </div>
      <div className={classes.btns_container}>
        <button
          className={classes.btn_plus}
          onClick={props.onAdd}
        >+</button>
        <button
          className={classes.btn_minus}
          onClick={props.onRemove}
        >-</button>
      </div>
    </li>
  )
}

export default CartItem