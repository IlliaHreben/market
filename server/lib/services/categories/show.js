const { Category }     = require('../../model')
const { dumpCategory } = require('../utils/dump')
const throwError       = require('../errors')
const {
  includeLinked,
  includeQueryBuilder
} = require('../utils/common')

const includeModels = Object.keys(Category.associations)
const includeQuery  = includeQueryBuilder(includeModels)

const validatorRules = {
  id      : [ 'required', 'uuid' ],
  include : [ { list_or_one: { one_of: includeModels } }, 'to_array' ]
}

const execute = async ({ id, include }) => {
  const included = includeQuery(include)

  const category = await Category.findOne({
    where   : { id },
    include : included
  })

  if (!category) throwError('WRONG_ID', 'category')

  const linked = includeLinked(category, include)

  return {
    data: dumpCategory(category),
    linked
  }
}

module.exports = { execute, validatorRules }
