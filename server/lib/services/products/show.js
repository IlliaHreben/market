const { Product }     = require('../../model')
const { dumpProduct } = require('../utils/dump')
const throwError      = require('../errors')
const {
  includeLinked,
  includeQueryBuilder
} = require('../utils/common')

const includeModels = Object.keys(Product.associations)
const includeQuery  = includeQueryBuilder(includeModels)

const validatorRules = {
  id      : [ 'required', 'uuid' ],
  include : [ { list_or_one: { one_of: includeModels } }, 'to_array' ]
}

const execute = async ({ id, include }) => {
  const included = includeQuery(include)

  const product = await Product.findOne({
    where   : { id },
    include : included
  })

  if (!product) throwError('WRONG_ID', 'product')

  const linked = includeLinked(product, include)

  return {
    data: dumpProduct(product),
    linked
  }
}

module.exports = { execute, validatorRules }
