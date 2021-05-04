const { dumpProduct }       = require('../utils/dump')
const { Product, Category } = require('../../model')
const throwError            = require('../errors')

const validatorRules = {
  name        : [ 'required', 'shortly_text' ],
  description : [ 'required', { min_length: 3 }, { max_length: 500 } ],
  price       : [ 'required', 'positive_decimal' ],
  quantity    : [ 'required', 'positive_decimal' ],
  categoryId  : [ 'required', 'uuid' ]
}

const execute = async (data, { transaction }) => {
  const category = await Category.findOne({ where: { id: data.categoryId } })

  if (!category) throwError('WRONG_ID', 'category')

  const product = await Product.create(data, { transaction })

  product.Category = category

  return { data: dumpProduct(product) }
}

module.exports = { execute, validatorRules }
