const makeServiceRunner = require('./makeServiceRunner')

const createUser = require('../services/users/create')
const listUsers  = require('../services/users/list')
const showUser   = require('../services/users/show')

module.exports = {
  create : makeServiceRunner(createUser),
  list   : makeServiceRunner(listUsers, req => ({ ...req.query })),
  show   : makeServiceRunner(showUser, req => ({ ...req.query, ...req.params }))
}
