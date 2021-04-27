const { dumpCategory } = require('../utils/dump')
const { Category } = require('../../model')
const throwError = require('../errors')

const validatorRules = {
  id   : [ 'required', 'uuid' ],
  name : [ 'required', 'shortly_text' ]
}

const execute = async ({ id, name }, { transaction }) => {
  const category = await Category.findOne({ where: { id } }, { transaction })

  if (!category) throwError('WRONG_ID', 'category')

  await category.update({ name }, { transaction })

  return dumpCategory(category)
}

module.exports = { execute, validatorRules }
