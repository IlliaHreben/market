const { Product } = require('../../model')
const throwError = require('../errors')
const { dumpProduct } = require('../utils/dump')

const validatorRules = {
  id: [ 'required', 'uuid' ]
}

const execute = async ({ id }, { transaction }) => {
  const product = await Product.findOne({ where: { id } })

  if (!product) throwError('WRONG_ID', 'product')

  await product.destroy({ transaction })

  return dumpProduct(product)
}

module.exports = { execute, validatorRules }
