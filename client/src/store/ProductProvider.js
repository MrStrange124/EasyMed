import { useState } from "react"
import ProductContext from "./product-context"

const ProductProvider = props => {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const addItemsHandler = (products) => {
    setItems([...products])
  }

  const setLoadingHandler = value => {
    if (!value) {
      setTimeout(() => {
        setLoading(value)
      }, 1300)
    }
    else
      setLoading(value)
  }

  const productContext = {
    products: items,
    loadProduct: addItemsHandler,
    isLoading: loading,
    setIsLoading: setLoadingHandler
  }
  return (
    <ProductContext.Provider value={productContext}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductProvider