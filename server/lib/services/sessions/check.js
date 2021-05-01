const { dumpUser } = require('../utils/dump')
const { User }     = require('../../model')
const throwError   = require('../errors')
const {
  auth : { secret, sessionExpire }
} = require('../../config')

const ms           = require('ms')
const { DateTime } = require('luxon')
const jwt          = require('jsonwebtoken')
const jwtVerify    = require('util').promisify(jwt.verify)

const validatorRules = {
  token: [ 'required' ] // TODO jwt validation
}

const execute = async ({ token }, { transaction }) => {
  let userData

  try {
    userData = await jwtVerify(token, secret)
  } catch (e) {
    if (e?.name === 'TokenExpiredError') throwError('TOKEN_EXPIRED')
    throwError('WRONG_TOKEN')
  }
  const user = await User.findOne({ where: { id: userData.id } })

  if (!user) throwError('NOT_EXIST', 'user')

  const timeDiff = DateTime.now().diff(DateTime.fromISO(user.sessionStartedAt)).milliseconds
  const isSessionExpired = user.sessionStartedAt &&
        Math.abs(timeDiff) > ms(sessionExpire)

  if (isSessionExpired) throwError('TOKEN_EXPIRED')

  return dumpUser(user)
}

module.exports = { execute, validatorRules }
