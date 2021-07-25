const express = require('express')
const Order = require('../model/order')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({})
    res.send(orders)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body)
    await order.save()
    res.status(201).send()
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router