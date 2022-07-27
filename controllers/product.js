//const Product = require('../model/Products')
const testingProducts = require('../model/testingProducts')

const getAllProductStatic = async (req, res) => {
  console.log(req.query);
  const product = await testingProducts.find({ price: { '$lt': 30 }, rating: { $gte: 4 } }).select('name price rating')
  return res.json({ nbhints: product.length, product })
}

const getAllProduct = async (req, res) => {
  const { name, price, featured, rating, company, sort, field, numericFilters } = req.query;
  const queryObject = {}

  //name
  if (name) {
    queryObject.name = name
  }

  // fetured
  if (featured) {
    queryObject.featured = req.query.featured === 'true' ? true : false
  }

  // company
  if (company) {
    queryObject.company = company
  }

  // numericFilters
  //{ price: { $lt: 30 }, rating: { $gte: 4 } }
  //{ numericFilters: 'price<30,rating>=4' }
  if (numericFilters) {
    const operatorsMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }

    const regExp = /\b(>|>=|=|<|<=)\b/g
    let filter = numericFilters.replace(regExp, (match) => `-${operatorsMap[match]}-`)

    const option = ['price', 'rating']
    filter.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if (option.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    })
  }

  let result = testingProducts.find(queryObject)

  // db methods

  // limit
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }

  // select
  if (field) {
    const selectList = field.split(',').join(' ')
    result = result.select(selectList)
  }

  const product = await result
  return res.json({ nbhints: product.length, product })
}

module.exports = { getAllProductStatic, getAllProduct }