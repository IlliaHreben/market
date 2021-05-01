const makeServiceRunner = require('./makeServiceRunner')

const createProduct = require('../services/products/create')
const listProducts  = require('../services/products/list')
const showProduct   = require('../services/products/show')
const deleteProduct = require('../services/products/delete')
const updateProduct = require('../services/products/update')

module.exports = {
  create : makeServiceRunner(createProduct),
  list   : makeServiceRunner(listProducts, req => ({ ...req.query })),
  show   : makeServiceRunner(showProduct, req => ({ ...req.query, ...req.params })),
  update : makeServiceRunner(updateProduct, req => ({ ...req.query, ...req.params })),
  delete : makeServiceRunner(deleteProduct, req => ({ ...req.query, ...req.params }))
}
