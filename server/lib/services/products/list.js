const { Product }     = require('../../model')
const { rules }       = require('../Base')
const { dumpProduct } = require('../utils/dump')
const {
  includeLinked,
  queryBuilder,
  includeQueryBuilder
} = require('../utils/common')

const searchFields = [ 'name', 'description' ]
const getQuery     = queryBuilder(searchFields)

const includeModels = Object.keys(Product.associations)
const includeQuery  = includeQueryBuilder(includeModels)

const validatorRules = {
  search     : [ 'not_empty', { min_length: 2 } ],
  categoryId : [ 'uuid' ],
  include    : [ { list_or_one: { one_of: includeModels } }, 'to_array' ],
  sort       : [ { one_of: Object.keys(Product.rawAttributes) }, { default: 'id' } ],
  order      : [ 'order', { default: 'DESC' } ],
  ...rules.pagination
}

const execute = async ({ search, sort, order, include, limit, offset, ...filters }) => {
  const query    = getQuery({ search, filters })
  const included = includeQuery(include)

  const [ products, filteredCount, totalCount ] = await Promise.all([
    Product.findAll({
      where   : query,
      order   : [ [ sort, order ] ],
      limit,
      offset,
      include : included
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
      limit,
      offset
    }
  }
}

module.exports = { execute, validatorRules }
