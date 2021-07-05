const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!value.includes('@'))
        throw new Error('Email is Invalid')
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 7)
        throw new Error('invalid password')
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }
  ]
})

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.tokens

  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user)
    throw new Error('Unable to login')
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch)
    throw new Error('Unable to login')
  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User