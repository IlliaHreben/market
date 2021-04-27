const runService = require('../services/runService')
const createCategory = runService(require('../services/categories/create'))
const listCategories = runService(require('../services/categories/list'))
const showCategory = runService(require('../services/categories/show'))

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

const show = async (req, res) => {
  const category = await showCategory({ ...req.query, ...req.params })
  res.send({
    ok: true,
    data: category
  })
}

module.exports = { create, list, show /* remove, findProducts */ }
