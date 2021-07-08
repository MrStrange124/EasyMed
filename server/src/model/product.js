const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    require: true
  },
  description: {
    type: String
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product