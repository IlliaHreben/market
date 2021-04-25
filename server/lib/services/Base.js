// const { sequelize } =
const { DMX } = require('../model')
const throwError = require('./errors')

async function run (callback) {
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

module.exports = run
