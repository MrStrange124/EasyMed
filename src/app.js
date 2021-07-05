const express = require('express')
const ProductRouter = require('./routers/product')
const UserRouter = require('./routers/user')
const Order = require('./model/order')
const cors = require('cors')

require('./db/mongoose')

const port = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(ProductRouter)
app.use(UserRouter)

app.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body)
    await order.save()
    res.status(201).send()
  } catch (e) {
    res.status(500).send()
  }
})

app.listen(port, () => {
  console.log(`Your app is running at http://localhost:${port}/`)
})