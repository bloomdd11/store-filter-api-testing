const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name must be provided']
  },
  price: {
    type: Number,
    required: [true, 'name must be provided']
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  company: {
    type: String,
    enum: ['ikea', 'marcos', 'liddy', 'caressa']
  }
})

module.exports = mongoose.model('testingProducts', productSchema)