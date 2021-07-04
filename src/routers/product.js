const express = require('express')
const Product = require('../model/product')

const router = new express.Router()

router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).send(product)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({})
    res.send(products)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.patch('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!product) {
      res.status(404).send()
    }
    res.send(product)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    res.send(product)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router