const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  user: {
    name: {
      type: String,
      trim: true,
      required: true
    },
    street: {
      type: String,
      trim: true,
      required: true
    },
    city: {
      type: String,
      trim: true,
      required: true
    },
    postalCode: {
      type: Number,
      trim: true,
      required: true
    }
  },
  orderedItems: [
    {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true,
        trim: true
      },
      amount: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ]
}, {
  timestamps: true
})

const Order = mongoose.model('Orders', OrderSchema)

module.exports = Order