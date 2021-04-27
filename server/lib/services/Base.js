const { DMX, sequelize } = require('../model')
const throwError = require('./errors')

async function run (callback) {
  const transaction = await sequelize.transaction()
  try {
    const result = await callback(transaction)

    await transaction.commit()

    return result
  } catch (error) {
    await transaction.rollback()
    console.log(error)

    if (error instanceof DMX) throwError(DMX)
    throw error
  }
}

const rules = {
  pagination: {
    limit  : [ 'positive_integer', { default: 10 } ],
    offset : [ 'integer', { min_number: 0 }, { default: 0 } ]
  },
  user: {
    email      : [ 'required', 'email' ],
    firstName  : [ 'required', 'shortly_text' ],
    secondName : [ 'required', 'shortly_text' ],
    password   : [ 'required', 'positive_integer' ]
  }
}

module.exports = { run, rules }
