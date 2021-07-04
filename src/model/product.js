const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
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

module.exports = Product