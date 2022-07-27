const { getAllProductStatic, getAllProduct } = require('../controllers/product')

const express = require('express')
const Router = express.Router()

Router.route('/').get(getAllProduct)
Router.route('/static').get(getAllProductStatic)

module.exports = Router