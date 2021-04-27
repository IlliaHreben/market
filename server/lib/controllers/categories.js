const runService = require('../services/runService')

const createCategory = runService(require('../services/categories/create'))
const listCategories = runService(require('../services/categories/list'))
const showCategory   = runService(require('../services/categories/show'))
const deleteCategory = runService(require('../services/categories/delete'))
const updateCategory = runService(require('../services/categories/update'))

const create = async (req, res) => {
  const category = await createCategory(req.body)
  res.send({
    ok   : true,
    data : category
  })
}

const remove = async (req, res) => {
  const category = await deleteCategory({ ...req.query, ...req.params })
  res.send({
    ok   : true,
    data : category
  })
}

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
    ok   : true,
    data : category
  })
}

const update = async (req, res) => {
  const category = await updateCategory({ ...req.query, ...req.params })
  res.send({
    ok   : true,
    data : category
  })
}

module.exports = { create, list, show, update, delete: remove }
