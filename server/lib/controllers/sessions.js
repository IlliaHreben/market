const runService        = require('../services/runService')
const makeServiceRunner = require('./makeServiceRunner')

const createSession = require('../services/sessions/create')
const checkSession = runService(require('../services/sessions/check'))

module.exports = {
  create: makeServiceRunner(createSession),

  check: async (req, res, next) => {
    try {
      await checkSession({ token: req.headers.authorization })

      return next()
    } catch (error) {
      next(error)
    }
  }

}
