const { dumpCategory } = require('../utils/dump')
const { Category } = require('../../model')

const validatorRules = {
  name: [ 'required', 'shortly_text' ]
}

const execute = async (data, { transaction }) => {
  const category = await Category.create(data, { transaction })

  return dumpCategory(category)
}

module.exports = { execute, validatorRules }
