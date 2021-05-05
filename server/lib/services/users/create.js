const { dumpUser }           = require('../utils/dump')
const { User }               = require('../../model')
const { rules }              = require('../Base')
const { checkPasswordGuess } = require('../../utils/passwordUtils')
const throwError             = require('../errors')

const validatorRules = rules.user

const execute = async ({ password, ...userData }, { transaction }) => {
  const isEmailExist = await User.findOne({
    where: { email: userData.email }
  })
  if (isEmailExist) throwError('USER_ALREADY_EXIST', 'email')

  checkPasswordGuess(password, userData)

  const user = await User.create({ password, ...userData }, { transaction })

  return { data: dumpUser(user) }
}

module.exports = { execute, validatorRules }
