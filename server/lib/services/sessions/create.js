const { dumpUser }      = require('../utils/dump')
const { User }          = require('../../model')
const { checkPassword } = require('../../utils/passwordUtils')
const throwError        = require('../errors')
const {
  auth : { secret, tokenExpire }
} = require('../../config')

const jwt = require('jsonwebtoken')

const validatorRules = {
  email    : [ 'required', 'email' ],
  password : [ 'required', 'string', { min_length: 6 } ]
}

const execute = async ({ password, email }, { transaction }) => {
  const existingUser = await User.findOne({
    where: { email: email }
  })
  if (!existingUser) throwError('AUTHENTICATION_FAILED')

  const isPasswordCorrect = checkPassword(password, existingUser.passwordHash)

  if (!isPasswordCorrect) throwError('AUTHENTICATION_FAILED')

  await existingUser.update({ sessionStartedAt: new Date() }, { transaction })

  return {
    data: {
      jwt: jwt.sign(
        dumpUser(existingUser),
        secret,
        { expiresIn: tokenExpire }
      )
    }
  }
}

module.exports = { execute, validatorRules }
