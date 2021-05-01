const { User }     = require('../../model')
const { dumpUser } = require('../utils/dump')
const throwError   = require('../errors')

const validatorRules = {
  id: [ 'required', 'uuid' ]
}

const execute = async ({ id }) => {
  const user = await User.findOne({ where: { id } })

  if (!user) throwError('WRONG_ID', 'user')

  return { data: dumpUser(user) }
}

module.exports = { execute, validatorRules }
