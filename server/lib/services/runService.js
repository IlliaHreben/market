const { run } = require('./Base')
const LIVR = require('./validator')
const ApiError = require('./ApiError')

const runService = ({ execute, validatorRules }) => {
  const validator = new LIVR.Validator(validatorRules)

  return input => {
    const validData = validator.validate(input)
    const errors = validator.getErrors()
    if (errors) {
      console.log(errors)
      throw new ApiError({ code: 'FORMAT_ERROR', message: 'Invalid format' })
    }
    return run(transaction => execute(validData, { transaction }))
  }
}

module.exports = runService
