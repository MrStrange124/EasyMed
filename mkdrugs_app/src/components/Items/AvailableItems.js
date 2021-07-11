import classes from './AvailableItems.module.css'
import Card from '../UI/Card'
import Item from './Item/Item'
import { useEffect, useState } from 'react'
const dummy = [{
  name: "product 1",
  id: 1,
  price: 25,
  rate: 20,
  description: "this is my first product"
}, {
  name: "product 2",
  id: 2,
  price: 15,
  rate: 12,
  description: "this is my second product"
}, {
  name: "product 3",
  id: 3,
  price: 30,
  rate: 25,
  description: "this is my third product"
}]

const totalItems = dummy.map(item => <Item
  key={item.id}
  id={item.id}
  name={item.name}
  price={item.price}
  rate={item.rate}
  description={item.description}
/>)

const AvailableItems = () => {
  const [Items, setItems] = useState([])

  useEffect(() => {
    setItems(totalItems)
  }, [])

  const filterProductHandler = (event) => {
    const userInput = event.target.value.toUpperCase()
    if (!userInput)
      setItems(totalItems)
    else {
      const filteredItems = totalItems.filter(item => item.props.name.toUpperCase().includes(userInput))
      setItems(filteredItems)
    }
  }



  return (
    <section className={classes.item_container}>
      <Card>
        <input
          type="text"
          className={classes.search_bar}
          placeholder="Search name here..."
          onChange={filterProductHandler} />
        {!Items.length && <p className={classes.errorMessage}>No result found</p>}
        <ul>
          {Items}
        </ul>
      </Card>
    </section>
  )
}

export default AvailableItems