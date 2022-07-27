require('dotenv').config()

const mongoose = require('mongoose')
const connectDB = require('./db/connect')
const testingProducts = require('./model/testingProducts')
const productJSON = require('./product.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    testingProducts.deleteMany()
    testingProducts.create(productJSON)
    console.log('passed');
  } catch (error) {
    console.log(error);
  }
}
start()


