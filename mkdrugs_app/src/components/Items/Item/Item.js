import classes from './Item.module.css'

const Item = (props) => {
  const percentage = (props.price - props.rate) / props.rate * 100
  return (
    <li className={classes.item}>
      <div className={classes.product_details}>
        <h3 className={classes.name}>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <span className={classes.rate}>₹{props.rate}</span>
        <span className={classes.price}>₹{props.price}</span>
        <span className={classes.percentage}>{percentage}% off</span>
      </div>
      <div className={classes.item_foam}>
        <input type="number" className={classes.input} min='1'
          max='1000'
          placeholder="1" />
        <button className={classes.add_btn} >Add to Card</button>
      </div>
    </li>
  )
}

export default Item