const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (value.length > 50)
        throw new Error("Name can't be longer 50 char")
    }
  },
  price: {
    type: Number,
    required: true,
    validate(value) {
      if (value > 100000 && value < 0)
        throw new Error("Entered No. is too Big")
    }
  },
  rate: {
    type: Number,
    required: true,
    validate(value) {
      if (value > 100000 && value < 0)
        throw new Error("Entered No. is too Big")
    }
  },
  description: {
    type: String,
    trim: true,
    validate(value) {
      if (value.length > 150)
        throw new Error("Description can't be longer 150 char")
    }
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product