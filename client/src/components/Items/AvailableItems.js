import classes from './AvailableItems.module.css'
import Card from '../UI/Card'
import Item from './Item/Item'
import { useEffect, useState } from 'react'

const AvailableItems = () => {
  const [totalItems, setTotalItems] = useState([])
  const [Items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('http://192.168.43.249:5000/products');
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error('something went worng');
      }
      const loadedItems = []
      for (const key in responseData) {
        loadedItems.push(
          <Item
            key={responseData[key]._id}
            id={responseData[key]._id}
            name={responseData[key].name}
            price={responseData[key].price}
            rate={responseData[key].rate}
            description={responseData[key].description}
          />
        )
      }
      setTotalItems(loadedItems)
      setItems(loadedItems)
    }
    fetchItems()
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