import React from 'react'

const ProductContext = React.createContext({
  products: [],
  isLoading: Boolean,
  setIsLoading: () => { },
  loadProduct: products => { }
})

export default ProductContext