import classes from './Card.module.css'
const Card = (props) => {
  return (
    <div className={classes.wrapper}>
      {props.children}
    </div>
  )
}

export default Card