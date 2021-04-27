// const { sequelize } =
const { DMX } = require('../model')
const throwError = require('./errors')

async function run(callback) {
  const transaction = await require('../model').sequelize.transaction()
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
    limit: ['positive_integer', { 'default': 10 }],
    offset: ['integer', { 'min_number': 0 }, { 'default': 0 }]
  }
}

module.exports = { run, rules }
