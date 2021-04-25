const express = require('express')
const asyncHandler = require('express-async-handler')

const { sequelize } = require('./model')
const controllers = require('./controllers')
const { handleError } = require('./controllers/middleware')
const config = require('./config')

const api = express.Router()
  .post('/products', asyncHandler(controllers.products.create))
  .post('/categories', asyncHandler(controllers.categories.create))
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
