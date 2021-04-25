const runService = require('../services/runService')
const createProduct = runService(require('../services/products/create'))
// const deleteProduct = runService(require('../services/products/delete'))
// const getInfoProduct = runService(require('../services/products/info'))
// const listProducts = runService(require('../services/products/list'))

const create = async (req, res) => {
  console.log(req.body)
  const product = await createProduct(req.body)
  res.send({
    ok: true,
    data: product
  })
}

// const remove = async (req, res) => {
//   await deleteProduct(req.query)
//   res.send({
//     ok: true
//   })
// }

// const info = async (req, res) => {
//   const product = await getInfoProduct(req.query)
//   res.send({
//     ok: true,
//     data: product
//   })
// }

// const findProducts = async (req, res) => {
//   const products = await listProducts(req.query)
//   res.send({
//     ok: true,
//     data: products
//   })
// }

module.exports = { create /* remove, info, findProducts */ }
