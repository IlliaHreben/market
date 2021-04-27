const { Category } = require('../../model')

const ApiError = require('../ApiError')
const { dumpCategory } = require('../utils/dump')

const validatorRules = {
  id: ['required', 'uuid']
}

const execute = async ({ id }, { transaction }) => {
  const category = await Category.findOne({ where: { id } })

  await category.destroy({ transaction })

  return dumpCategory(category)

  // if (!quantity) throw new ApiError({ code: 'FILM_NOT_FOUND', message: 'No movie found for this ID' }) // quantity = 0
}

module.exports = { execute, validatorRules }
