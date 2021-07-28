import React from 'react'

const ProductContext = React.createContext({
  products: [],
  loadProduct: products => { }
})

export default ProductContext