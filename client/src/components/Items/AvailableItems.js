import classes from './AvailableItems.module.css'
import Card from '../UI/Card'
import Item from './Item/Item'
import { useContext, useEffect, useState } from 'react'
import { useCookies } from "react-cookie"
import ProductContext from '../../store/product-context'
import Swiper from '../UI/Swiper'
import EditItem from './EditItem'

const AvailableItems = (props) => {
  const [totalItems, setTotalItems] = useState([])
  const [Items, setItems] = useState([])
  const [showSwiper, setShowSwiper] = useState(true)
  const [pageNo, setPageNo] = useState(1)
  const productCtx = useContext(ProductContext)
  const [cookies] = useCookies(['jwt'])
  const [editModal, setEditModal] = useState(false)
  const [product, setProduct] = useState({})

  const limit = 10;
  const changePage = (page) => {
    if (page === 0 || page === Math.ceil(totalItems.length / limit) + 1)
      return;
    const temp = []
    let j = limit;
    for (let i = (page - 1) * limit; i < totalItems.length && j--; i++)
      temp.push(totalItems[i])
    setItems(temp)
    setPageNo(page)
  }
  const deleteItemHandler = async (id) => {
    const url = "http://localhost:5000/products/" + id
    const response = await fetch(url, {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.jwt}`
      }
    })
    if (!response.ok) {
      alert('something went worng.')
      return
    }
    alert('Successfully deleted')
    props.fetchItems()
    setPageNo(1)
  }
  const EditHandler = (key) => {
    setProduct(productCtx.products[key])
  }
  useEffect(() => {
    const products = productCtx.products
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
          onDelete={() => { deleteItemHandler(products[key]._id) }}
          onEdit={() => {
            setEditModal(true)
            EditHandler(key)
          }}
        />
      )
    }
    setTotalItems(loadedItems)
    let temp = []
    for (let i = 0; i < loadedItems.length && i < limit; i++)
      temp.push(loadedItems[i])
    setItems(temp)
  }, [productCtx])

  const filterProductHandler = (event) => {
    const userInput = event.target.value.trim().toUpperCase()
    if (!userInput) {
      changePage(1)
      setShowSwiper(true)
    }
    else {
      setShowSwiper(false)
      const filteredItems = totalItems.filter(item => item.props.name.toUpperCase().includes(userInput))
      setItems(filteredItems)
    }
  }

  return (
    <section className={classes.item_container}>
      {editModal && <EditItem onClose={() => setEditModal(false)} fetchItems={props.fetchItems} product={product} />}
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
        {
          showSwiper &&
          <Swiper
            page={pageNo}
            totalPages={Math.ceil(totalItems.length / limit)}
            prevPage={() => changePage(pageNo - 1)}
            nextPage={() => changePage(pageNo + 1)}
          />}
      </Card>
    </section>
  )
}

export default AvailableItems