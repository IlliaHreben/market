const fetch             = require('node-fetch')
const users             = require('./fixtures/users.json')
const products          = require('./fixtures/products.json')
const categories        = require('./fixtures/categories.json')
const { app: { port } } = require('../lib/config')
const {
  sequelize,
  User,
  Product,
  Category
} = require('../lib/model')

const userCredentials = {
  email    : users[0].email,
  password : users[0].password
}

async function setDefaultUsers () {
  return User.bulkCreate(users)
}

async function setDefaultProducts () {
  return Product.bulkCreate(products)
}

async function setDefaultCategories () {
  return Category.bulkCreate(categories)
}

async function authUser (requestBody = userCredentials) {
  const result = await fetch(`http://localhost:${port}/api/sessions`, {
    method  : 'POST',
    body    : JSON.stringify(requestBody),
    headers : {
      'Content-Type': 'application/json'
    }
  })
  const { data } = await result.json()
  return data.jwt
}

const create = async (route, token, requestBody) => {
  const result = await fetch(`http://localhost:${port}/api${route}`, {
    method  : 'POST',
    body    : JSON.stringify(requestBody),
    headers : {
      'Content-Type' : 'application/json',
      Authorization  : token
    }
  })

  const body = await result.json()
  return body
}

module.exports = {
  setDefaultUsers,
  setDefaultProducts,
  setDefaultCategories,

  create,

  authUser,

  sequelize
}
