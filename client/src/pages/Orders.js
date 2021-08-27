import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import classes from "./Orders.module.css"

const Item = props => {
  return <div className={classes.item}>
    <p className={classes.item_name}>{props.name}</p>
    <p className={classes.rate}>₹{props.rate} x {props.quantity}</p>
    <p>₹{props.rate * props.quantity}</p>
  </div>
}

const Order = props => {
  const Items = []
  const fillItems = (items) => {
    for (const key in items) {
      Items.push(
        <Item
          key={items[key]._id}
          name={items[key].name}
          rate={items[key].rate}
          quantity={items[key].quantity}
        />
      )
    }
    return Items
  }
  let date = new Date(props.date).toDateString()
  date += ", " + new Date(props.date).toLocaleTimeString()
  return <div className={classes.order}>
    <div className={classes.person}>
      <p className={classes.date}>{date}</p>
      <h2>{props.customer.name}</h2>
      <h4>{props.customer.number}</h4>
      <p>{props.customer.address},  {props.customer.pincode}</p>
    </div>
    <div className={classes.items}>
      {fillItems(props.items)}
      <h3 className={classes.totalAmount}>Total Amount: ₹{props.totalAmount} </h3>
    </div>
  </div>
}

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [cookies] = useCookies(['jwt'])

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("http://localhost:5000/orders", {
        method: "get",
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
      const responseData = await response.json();
      setOrders(responseData)
    }
    fetchOrders()
  }, [cookies.jwt])

  const allOrders = []
  const fillOrders = orders => {
    for (const key in orders) {
      allOrders.push(
        <Order
          key={orders[key]._id}
          customer={orders[key].customer}
          totalAmount={orders[key].totalAmount}
          items={orders[key].Items}
          date={orders[key].createdAt}
        />
      )
    }
    return allOrders
  }
  return (
    <>
      <h1 className={classes.title}>Orders</h1>
      <div className={classes.container}>
        {fillOrders(orders)}
      </div>
    </>
  )
}

export default Orders