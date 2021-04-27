const { dumpProduct } = require('../utils/dump')
const { Product } = require('../../model')

const validatorRules = {
  name        : [ 'required', 'shortly_text' ],
  description : [ 'required', { min_length: 3 }, { max_length: 500 } ],
  price       : [ 'required', 'string' ], // TODO validation only numbers
  quantity    : [ 'required', 'positive_integer' ],
  categoryId  : [ 'required', 'uuid' ]
}

const execute = async (data, { transaction }) => {
  const product = await Product.create(data, { transaction })

  return dumpProduct(product)
}

module.exports = { execute, validatorRules }
