require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const Product = require('./route/product')

const PORT = process.env.PORT || 3000

// middleware
app.use(express.json())

// route
app.get('/', (req, res) => {
  res.send('<h1>store filter api</h1><a href="api/v1/products" target="_blank">store api</a>')
})
app.use('/api/v1/products', Product)

// listen
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`))
  } catch (error) {
    console.log(error);
  }
}
start()