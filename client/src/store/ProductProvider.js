import { useState } from "react"
import ProductContext from "./product-context"

const ProductProvider = props => {

  const [items, setItems] = useState([])

  const addItemsHandler = (products) => {
    setItems([...products])
  }

  const productContext = {
    products: items,
    loadProduct: addItemsHandler
  }
  return (
    <ProductContext.Provider value={productContext}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductProvider