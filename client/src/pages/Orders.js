import { useContext } from "react"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import Swiper from "../components/UI/Swiper"
import ProductContext from "../store/product-context"
import classes from "./Orders.module.css"
import { FaTrashAlt } from 'react-icons/fa'

const Item = props => {
  return <div className={classes.item}>
    <p className={classes.item_name}>{props.name}</p>
    <p className={classes.rate}>₹{props.rate} x {props.quantity}</p>
    <p>₹{props.rate * props.quantity}</p>
  </div>
}

const Order = props => {
  const fillItems = (items) => {
    const Items = []
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
      <FaTrashAlt className={classes.delete} onClick={() => props.onDelete(props._id)} />
      <p className={classes.date}>{date}</p>
      <h2>{props.customer.name}</h2>
      <h4>{props.customer.number}</h4>
      <p>{props.customer.address},  {props.customer.pincode}</p>
    </div>
    <div className={classes.items}>
      <h3 className={classes.item_title}>Product Name</h3>
      {fillItems(props.items)}
      <h3 className={classes.totalAmount}>Total Amount: ₹{props.totalAmount} </h3>
    </div>
  </div>
}

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [cookies] = useCookies(['jwt'])
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const productCtx = useContext(ProductContext)

  const fetchOrders = async (page = 1) => {
    productCtx.setIsLoading(true)
    const url = "http://localhost:5000/orders?page=" + page
    const response = await fetch(url, {
      method: "get",
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
    const responseData = await response.json();
    setOrders(responseData.orders)
    setTotalPages(Math.ceil(responseData.totalOrders / 10))
  }

  const deleteOrderHandler = async (id) => {
    if (!window.confirm('Are you sure to delete this order?'))
      return
    productCtx.setIsLoading(true)
    const url = "http://localhost:5000/orders/" + id
    const response = await fetch(url, {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.jwt}`
      }
    })

    productCtx.setIsLoading(false)
    if (!response.ok) {
      alert('something went worng.')
      return
    }
    fetchOrders()
  }

  useEffect(() => {
    fetchOrders()
  }, [cookies.jwt])

  const fillOrders = orders => {
    const allOrders = []
    for (const key in orders) {
      allOrders.push(
        <Order
          key={orders[key]._id}
          customer={orders[key].customer}
          totalAmount={orders[key].totalAmount}
          items={orders[key].Items}
          date={orders[key].createdAt}
          _id={orders[key]._id}
          onDelete={deleteOrderHandler}
        />
      )
    }
    return allOrders
  }

  const nextPage = () => {
    if (pageNo === totalPages)
      return
    fetchOrders(pageNo + 1)
    setPageNo(pageNo + 1)
  }

  const prevPage = () => {
    if (pageNo === 1)
      return
    fetchOrders(pageNo - 1)
    setPageNo(pageNo - 1)
  }

  return (
    <>
      <h1 className={classes.title}>Orders</h1>
      <div className={classes.container}>
        {fillOrders(orders)}
        <Swiper nextPage={nextPage} prevPage={prevPage} page={pageNo} totalPages={totalPages} />
      </div>
    </>
  )
}

export default Orders