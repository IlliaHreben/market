const runService = require('../services/runService')

const createProduct = runService(require('../services/products/create'))
const listProducts  = runService(require('../services/products/list'))
const showProduct   = runService(require('../services/products/show'))
const deleteProduct = runService(require('../services/products/delete'))
const updateProduct = runService(require('../services/products/update'))

const create = async (req, res) => {
  console.log(req.body)
  const product = await createProduct(req.body)
  res.send({
    ok   : true,
    data : product
  })
}

const remove = async (req, res) => {
  const product = await deleteProduct({ ...req.query, ...req.params })
  res.send({
    ok   : true,
    data : product
  })
}

const show = async (req, res) => {
  const product = await showProduct({ ...req.query, ...req.params })
  res.send({
    ok   : true,
    data : product
  })
}

const list = async (req, res) => {
  const products = await listProducts(req.query)
  res.send({
    ok   : true,
    data : products
  })
}

const update = async (req, res) => {
  const product = await updateProduct({ ...req.query, ...req.params })
  res.send({
    ok   : true,
    data : product
  })
}

module.exports = { create, list, show, update, delete: remove }
