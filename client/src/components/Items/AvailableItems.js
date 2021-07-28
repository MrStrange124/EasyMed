import classes from './AvailableItems.module.css'
import Card from '../UI/Card'
import Item from './Item/Item'
import { useContext, useEffect, useState } from 'react'
import ProductContext from '../../store/product-context'

const AvailableItems = () => {
  const [totalItems, setTotalItems] = useState([])
  const [Items, setItems] = useState([])
  const productCtx = useContext(ProductContext)

  useEffect(() => {
    const products = productCtx.products
    console.log(productCtx.products)
    const loadedItems = []
    for (const key in products) {
      loadedItems.push(
        <Item
          key={products[key]._id}
          id={products[key]._id}
          name={products[key].name}
          price={products[key].price}
          rate={products[key].rate}
          description={products[key].description}
        />
      )
    }
    setTotalItems(loadedItems)
    setItems(loadedItems)
  }, [productCtx])

  const filterProductHandler = (event) => {
    const userInput = event.target.value.trim().toUpperCase()
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