const runService = require('../services/runService')

const defaultParamsBuilder = (req, res) => ({ ...req.body })

function makeServiceRunner (service, paramsBuilder = defaultParamsBuilder) {
  return async (req, res, next) => {
    const params = paramsBuilder(req, res)
    try {
      const data = await runService(service)(params)
      res.send({
        ok: true,
        ...data
      })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = makeServiceRunner
