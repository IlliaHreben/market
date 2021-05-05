const { Category } = require('../../model')
const throwError   = require('../errors')

const { dumpCategory } = require('../utils/dump')

const validatorRules = {
  id: [ 'required', 'uuid' ]
}

const execute = async ({ id }, { transaction }) => {
  const category = await Category.findOne({ where: { id } })

  if (!category) throwError('WRONG_ID', 'category')

  await category.destroy({ transaction })

  return { data: dumpCategory(category) }
}

module.exports = { execute, validatorRules }
