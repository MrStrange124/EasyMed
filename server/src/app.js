const express = require('express')
const ProductRouter = require('./routers/product')
const UserRouter = require('./routers/user')
const OrderRouter = require('./routers/order')
const cors = require('cors')

require('./db/mongoose')

const port = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(ProductRouter)
app.use(UserRouter)
app.use(OrderRouter)



app.listen(port, () => {
  console.log(`Your app is running at http://localhost:${port}/`)
})