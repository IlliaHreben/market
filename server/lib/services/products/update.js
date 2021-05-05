const { dumpProduct } = require('../utils/dump')
const { Product }     = require('../../model')
const throwError      = require('../errors')

const validatorRules = {
  id          : [ 'required', 'uuid' ],
  description : [ 'required', { min_length: 3 }, { max_length: 500 } ],
  price       : [ 'required', 'positive_decimal' ],
  quantity    : [ 'required', 'positive_decimal' ],
  categoryId  : [ 'required', 'uuid' ]
}

const execute = async ({ id, ...data }, { transaction }) => {
  const product = await Product.findOne({ where: { id } }, { transaction })

  if (!product) throwError('WRONG_ID', 'product')

  await product.update(data, { transaction })

  return { data: dumpProduct(product) }
}

module.exports = { execute, validatorRules }
