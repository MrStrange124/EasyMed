const express = require('express')
const Order = require('../model/order')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/orders', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const orders = await Order.find({}).sort({ createdAt: -1 }).limit(+limit).skip(limit * (page - 1))
    const totalOrders = await Order.countDocuments({})
    res.send({ orders, totalOrders })
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
router.delete('/orders/:id', auth, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    res.send(order)
  } catch (error) {
    res.status(400).send(error)
  }
})
module.exports = router