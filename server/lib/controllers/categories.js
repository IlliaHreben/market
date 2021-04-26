const runService = require('../services/runService')
const createCategory = runService(require('../services/categories/create'))
const listCategories = runService(require('../services/categories/list'))
// const deleteProduct = runService(require('../services/categories/delete'))
// const listProducts = runService(require('../services/categories/list'))

const create = async (req, res) => {
  const category = await createCategory(req.body)
  res.send({
    ok: true,
    data: category
  })
}

// const remove = async (req, res) => {
//   await deleteProduct(req.query)
//   res.send({
//     ok: true
//   })
// }

const list = async (req, res) => {
  const payload = await listCategories(req.query)
  res.send({
    ok: true,
    ...payload
  })
}

// const findProducts = async (req, res) => {
//   const categories = await listProducts(req.query)
//   res.send({
//     ok: true,
//     data: categories
//   })
// }

module.exports = { create, list /* remove, findProducts */ }
