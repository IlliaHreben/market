const { User }     = require('../../model')
const { rules }        = require('../Base')
const { dumpUser } = require('../utils/dump')
const {
  queryBuilder
} = require('../utils/common')

const searchFields = [ 'email', 'id' ]
const getQuery     = queryBuilder(searchFields)

const validatorRules = {
  search : [ 'not_empty', { min_length: 2 } ],
  sort   : [ { one_of: Object.keys(User.rawAttributes) }, { default: 'updatedAt' } ],
  order  : [ 'order', { default: 'DESC' } ],
  ...rules.pagination
}

const execute = async ({ search, sort, order, limit, offset, ...filters }) => {
  const query = getQuery({ search })

  const [ users, filteredCount, totalCount ] = await Promise.all([
    User.findAll({
      where : query,
      order : [ [ sort, order ] ],
      limit,
      offset,
      ...filters
    }),
    User.count({ where: query }),
    User.count()
  ])

  return {
    data : users.map(dumpUser),
    meta : {
      totalCount,
      filteredCount,
      limit,
      offset
    }
  }
}

module.exports = { execute, validatorRules }
