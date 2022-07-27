//const Product = require('../model/Products')
const testingProducts = require('../model/testingProducts')

const getAllProductStatic = async (req, res) => {
  console.log(req.query);
  const product = await testingProducts.find(req.query).sort('price -name').select('name price')
  return res.json({ nbhints: product.length, product })
}

const getAllProduct = async (req, res) => {
  const { name, price, featured, rating, company, sort, field } = req.query;
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

  let result = testingProducts.find(queryObject)

  // db methods

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