const { Op } = require('sequelize')
const { dumpCategory, dumpProduct } = require('./dump')

const linkedDump = {
  Category : dumpCategory,
  Products : dumpProduct
}

const includeLinked = (instances, includes = []) => {
  if (!Array.isArray(instances)) instances = [ instances ]
  const linked = includes.reduce((acc, modelName) => ({ ...acc, [modelName]: [] }), {})

  instances.forEach(instance => includes.forEach(modelName => {
    let includedInstances = instance[modelName]
    if (!Array.isArray(includedInstances)) includedInstances = [ includedInstances ]

    includedInstances.forEach(includedInstance => {
      linked[modelName].push(linkedDump[modelName](includedInstance))
    })
  }))

  return linked
}

const queryBuilder = (searchFields = []) => ({
  filters = {},
  search
} = {}) => {
  const query = {}

  if (search) {
    query[Op.or] = searchFields.map(name => ({
      [name]: { [Op.iLike]: `%${search}%` }
    }))
  }

  Object.keys(filters)
    .filter(i => filters[i])
    .forEach(filter => query[filter] = filters[filter])

  return query
}

const includeQueryBuilder = (includeModels = []) => (include = []) => {
  return include.filter(key => includeModels.includes(key))
}

module.exports = { includeLinked, queryBuilder, includeQueryBuilder }
