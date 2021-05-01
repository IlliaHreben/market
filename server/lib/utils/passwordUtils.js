// const { randomBytes } = require('crypto');
const bcrypt = require('bcryptjs')
const throwError = require('../services/errors')

const SALT_ROUNDS = 2

function checkPasswordGuess (password, user) {
  const dangerous = [
    user.firstName,
    user.secondName,
    user.email.split('@')[0]
  ]
    .map(s => s.toLowerCase())
    .map(s => s.trim())
    .filter(s => s.length > 2)

  const isFuzzable = dangerous.some(word => password.includes(word))

  if (isFuzzable) throwError('GUESSABLE_PASSWORD')
}

function checkPassword (plain, passwordHash) {
  return bcrypt.compare(plain, passwordHash)
}

function encryptPassword (password) {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS)

  return bcrypt.hashSync(password, salt)
}

module.exports = { encryptPassword, checkPassword, checkPasswordGuess }
