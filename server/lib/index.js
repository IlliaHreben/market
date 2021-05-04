const express = require('express')

const { sequelize } = require('./model')
const controllers   = require('./controllers')
const config        = require('./config')

const { check:checkSession } = controllers.sessions

const api = express.Router()

  // Sessions
  .post('/sessions', controllers.sessions.create)

  // Users
  .post('/users', controllers.users.create)
  .get('/users', checkSession, controllers.users.list)
  .get('/users/:id', checkSession, controllers.users.show)

  // Products
  .post('/products', checkSession, controllers.products.create)
  .get('/products', checkSession, controllers.products.list)
  .get('/products/:id', checkSession, controllers.products.show)
  .delete('/products/:id', checkSession, controllers.products.delete)
  .patch('/products/:id', checkSession, controllers.products.update)

  // Categories
  .post('/categories', checkSession, controllers.categories.create)
  .get('/categories', checkSession, controllers.categories.list)
  .get('/categories/:id', checkSession, controllers.categories.show)
  .delete('/categories/:id', checkSession, controllers.categories.delete)
  .patch('/categories/:id', checkSession, controllers.categories.update)

  .use(controllers.middleware.handleError)

const app = express()
  .use(express.urlencoded({ extended: true }))
  .use(express.json({
    limit  : 1000,
    verify : (req, res, buf) => {
      try {
        JSON.parse(buf)
      } catch (e) {
        res.status(400)
        res.send({
          ok    : false,
          error : {
            code    : 'BROKEN_JSON',
            message : 'Please, verify your json'
          }
        })
        throw new Error('BROKEN_JSON')
      }
    }
  }))
  .use('/api', api)

const listenPort = port => {
  return new Promise((resolve, reject) => {
    app.listen(port, err => {
      err ? reject(err) : resolve()
    })
  })
}

const startApp = async port => {
  await sequelize.sync({ force: config.db.forceReset })
  await listenPort(port)
  console.log(`Successfully started on port ${port}.`)
}

startApp(config.app.port)
