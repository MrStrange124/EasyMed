const express = require('express')
const ProductRouter = require('./routers/product')
const User = require('./model/user')
const auth = require('./middleware/auth')
require('./db/mongoose')

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(ProductRouter)

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

app.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  }
  catch (e) {
    res.status(401).send(e)
  }
})

app.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(port, () => {
  console.log(`Your app is running at http://localhost:${port}/`)
})