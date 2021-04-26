const { Category } = require('../../model')

const { dumpCategory } = require('../utils/dump')
const { includeLinked, queryBuilder, includeQueryBuilder } = require('../utils/common')

const searchFields = ['name', 'id']
const getQuery = queryBuilder(searchFields);

const includeModels = Object.keys(Category.associations)
const includeQuery = includeQueryBuilder(includeModels);

const validatorRules = {
  search: [{ 'min_length': 2 }],
  include: [{ 'list_or_one': { 'one_of': includeModels } }, 'to_array'],
  limit: ['positive_integer', { 'default': 10 }],
  offset: ['integer', { 'min_number': 0 }, { 'default': 0 }],
  sort: [{ 'one_of': Object.keys(Category.rawAttributes) }, { 'default': 'id' }],
  order: ['order', { 'default': 'DESC' }]
}

const execute = async ({ search, sort, order, include, ...filters }) => {
  const query = getQuery(search)
  const included = includeQuery(include)

  const [categories, filteredCount, totalCount] = await Promise.all([
    Category.findAll({
      where: query,
      order: [[sort, order]],
      include: included,
      ...filters
    }),
    Category.count({ where: query }),
    Category.count()
  ])

  const linked = includeLinked(categories, include)

  return {
    data: categories.map(dumpCategory),
    linked,
    meta: {
      totalCount,
      filteredCount,
      limit: filters.limit,
      offset: filters.offset,
    }
  }
}

module.exports = { execute, validatorRules }
