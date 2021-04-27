const { Product }     = require('../../model')
const { rules }       = require('../Base')
const { dumpProduct } = require('../utils/dump')
const {
  includeLinked,
  queryBuilder,
  includeQueryBuilder
} = require('../utils/common')

const searchFields = [ 'id', 'name', 'description' ]
const getQuery     = queryBuilder(searchFields)

const includeModels = Object.keys(Product.associations)
const includeQuery  = includeQueryBuilder(includeModels)

const validatorRules = {
  search  : [ 'not_empty', { min_length: 2 } ],
  include : [ { list_or_one: { one_of: includeModels } }, 'to_array' ],
  sort    : [ { one_of: Object.keys(Product.rawAttributes) }, { default: 'id' } ],
  order   : [ 'order', { default: 'DESC' } ],
  ...rules.pagination
}

const execute = async ({ search, sort, order, include, ...filters }) => {
  const query    = getQuery({ search })
  const included = includeQuery(include)

  const [ products, filteredCount, totalCount ] = await Promise.all([
    Product.findAll({
      where   : query,
      order   : [ [ sort, order ] ],
      include : included,
      ...filters
    }),
    Product.count({ where: query }),
    Product.count()
  ])

  const linked = includeLinked(products, include)

  return {
    data : products.map(dumpProduct),
    linked,
    meta : {
      totalCount,
      filteredCount,
      limit  : filters.limit,
      offset : filters.offset
    }
  }
}

module.exports = { execute, validatorRules }
