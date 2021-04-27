const express = require('express')
const asyncHandler = require('express-async-handler')

const { sequelize } = require('./model')
const controllers = require('./controllers')
const { handleError } = require('./controllers/middleware')
const config = require('./config')

const api = express.Router()

  // Products
  .post('/products', asyncHandler(controllers.products.create))
  .get('/products', asyncHandler(controllers.products.list))
  .get('/products/:id', asyncHandler(controllers.products.show))
  .delete('/products/:id', asyncHandler(controllers.products.delete))

  // Categories
  .post('/categories', asyncHandler(controllers.categories.create))
  .get('/categories', asyncHandler(controllers.categories.list))
  .get('/categories/:id', asyncHandler(controllers.categories.show))
  .delete('/categories/:id', asyncHandler(controllers.categories.delete))

  .use(handleError)

const app = express()
  .use(express.urlencoded({ extended: true }))
  .use(express.json({
    limit: 1000,
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf)
      } catch (e) {
        res.status(400)
        res.send({
          ok: false,
          error: {
            code: 'BROKEN_JSON',
            message: 'Please, verify your json'
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
