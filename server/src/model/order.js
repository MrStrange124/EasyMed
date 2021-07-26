const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  customer: {
    name: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (value.length > 50)
          throw new Error("Name can't be longer 50 char")
      }
    },
    address: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (value.length > 150)
          throw new Error("Address can't be longer 150 char")
      }
    },
    number: {
      type: Number,
      trim: true,
      required: true,
      validate(value) {
        if (value.toString().length != 10)
          throw new Error("Invalid Phone No.")
      }
    },
    pincode: {
      type: Number,
      trim: true,
      required: true,
      validate(value) {
        if (value.toString().length != 6)
          throw new Error("Invalid PinCode")
      }
    }
  },
  Items: [
    {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
          if (value.length > 50)
            throw new Error("Name can't be longer 50 char")
        }
      },
      quantity: {
        type: Number,
        required: true,
        validate(value) {
          if (value > 10000)
            throw new Error("Too big order")
        }
      },
      rate: {
        type: Number,
        required: true,
        validate(value) {
          if (value > 100000)
            throw new Error("Rate invalid")
        }
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    validate(value) {
      if (value > 1000000)
        throw new Error("TotalAmount is too big")
    }

  }
}, {
  timestamps: true
})

const Order = mongoose.model('Orders', OrderSchema)

module.exports = Order