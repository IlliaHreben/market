const express      = require('express')
const aHandler = require('express-async-handler')

const { sequelize } = require('./model')
const controllers   = require('./controllers')
const config = require('./config')

const { check:checkSession } = controllers.sessions

const api = express.Router()

  // Sessions
  .post('/sessions', controllers.sessions.create)

  // Users
  .post('/users', aHandler(controllers.users.create))
  .get('/users', checkSession, aHandler(controllers.users.list))
  .get('/users/:id', checkSession, aHandler(controllers.users.show))
  .delete('/users/:id', checkSession, aHandler(controllers.users.delete))
  .patch('/users/:id', checkSession, aHandler(controllers.users.update))

  // Products
  .post('/products', checkSession, aHandler(controllers.products.create))
  .get('/products', checkSession, aHandler(controllers.products.list))
  .get('/products/:id', checkSession, aHandler(controllers.products.show))
  .delete('/products/:id', checkSession, aHandler(controllers.products.delete))
  .patch('/products/:id', checkSession, aHandler(controllers.products.update))

  // Categories
  .post('/categories', aHandler(controllers.categories.create))
  .get('/categories', aHandler(controllers.categories.list))
  .get('/categories/:id', aHandler(controllers.categories.show))
  .delete('/categories/:id', aHandler(controllers.categories.delete))
  .patch('/categories/:id', aHandler(controllers.categories.update))

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
  console.log(`Succesfully started on port ${port}.`)
}

startApp(config.app.port)
