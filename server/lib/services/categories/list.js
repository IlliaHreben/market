const { Category }     = require('../../model')
const { rules }        = require('../Base')
const { dumpCategory } = require('../utils/dump')
const {
  includeLinked,
  queryBuilder,
  includeQueryBuilder
} = require('../utils/common')

const searchFields = [ 'name', 'id' ]
const getQuery     = queryBuilder(searchFields)

const includeModels = Object.keys(Category.associations)
const includeQuery  = includeQueryBuilder(includeModels)

const validatorRules = {
  search  : [ 'not_empty', { min_length: 2 } ],
  include : [ { list_or_one: { one_of: includeModels } }, 'to_array' ],
  sort    : [ { one_of: Object.keys(Category.rawAttributes) }, { default: 'updatedAt' } ],
  order   : [ 'order', { default: 'DESC' } ],
  ...rules.pagination
}

const execute = async ({ search, sort, order, include, limit, offset, ...filters }) => {
  const query    = getQuery({ search })
  const included = includeQuery(include)

  const [ categories, filteredCount, totalCount ] = await Promise.all([
    Category.findAll({
      where   : query,
      order   : [ [ sort, order ] ],
      include : included,
      limit,
      offset,
      ...filters
    }),
    Category.count({ where: query }),
    Category.count()
  ])

  const linked = includeLinked(categories, include)

  return {
    data : categories.map(dumpCategory),
    linked,
    meta : {
      totalCount,
      filteredCount,
      limit,
      offset
    }
  }
}

module.exports = { execute, validatorRules }
