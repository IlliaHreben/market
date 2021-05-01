const { run }  = require('./Base')
const LIVR     = require('./validator')
const ApiError = require('./ApiError')

const runService = ({ execute, validatorRules }) => {
  const validator = new LIVR.Validator(validatorRules)

  return input => {
    const validData = validator.validate(input)
    const errors    = validator.getErrors()
    if (errors) {
      throw new ApiError({
        code    : 'FORMAT_ERROR',
        message : 'Invalid format',
        fields  : errors
      })
    }
    return run(transaction => execute(validData, { transaction }))
  }
}

module.exports = runService
