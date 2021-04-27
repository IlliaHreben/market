const { Product } = require('../../model')

const ApiError = require('../ApiError')
const { dumpProduct } = require('../utils/dump')

const validatorRules = {
  id: ['required', 'uuid']
}

const execute = async ({ id }, { transaction }) => {
  console.log(id);
  const product = await Product.findOne({ where: { id } })

  await product.destroy({ transaction })

  return dumpProduct(product)

  // if (!quantity) throw new ApiError({ code: 'FILM_NOT_FOUND', message: 'No movie found for this ID' }) // quantity = 0
}

module.exports = { execute, validatorRules }
