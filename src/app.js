const express = require('express')
const ProductRouter = require('./routers/product')
require('./db/mongoose')

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(ProductRouter)

app.listen(port, () => {
  console.log(`Your app is running at http://localhost:${port}/`)
})