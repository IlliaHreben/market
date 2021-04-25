const runService = require('../services/runService')
const createCategory = runService(require('../services/categories/create'))
// const deleteProduct = runService(require('../services/categories/delete'))
// const getInfoProduct = runService(require('../services/categories/info'))
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

// const info = async (req, res) => {
//   const category = await getInfoProduct(req.query)
//   res.send({
//     ok: true,
//     data: category
//   })
// }

// const findProducts = async (req, res) => {
//   const categories = await listProducts(req.query)
//   res.send({
//     ok: true,
//     data: categories
//   })
// }

module.exports = { create /* remove, info, findProducts */ }
