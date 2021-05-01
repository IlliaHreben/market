const makeServiceRunner = require('./makeServiceRunner')

const createCategory = require('../services/categories/create')
const listCategories = require('../services/categories/list')
const showCategory   = require('../services/categories/show')
const deleteCategory = require('../services/categories/delete')
const updateCategory = require('../services/categories/update')

module.exports = {
  create : makeServiceRunner(createCategory),
  list   : makeServiceRunner(listCategories, req => ({ ...req.query })),
  show   : makeServiceRunner(showCategory, req => ({ ...req.query, ...req.params })),
  update : makeServiceRunner(updateCategory, req => ({ ...req.query, ...req.params })),
  delete : makeServiceRunner(deleteCategory, req => ({ ...req.query, ...req.params }))
}
