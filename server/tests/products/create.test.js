const factory = require('../testFactory')
const { sequelize } = require('../../lib/model')
const categories = require('../fixtures/categories.json')

let createProduct

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await factory.setDefaultCategories()
  await factory.setDefaultUsers()
  const token = await factory.authUser()

  createProduct = requestBody => factory.create('/products', token, requestBody)
})

const payload = {
  name        : 'name',
  categoryId  : categories[0].id,
  description : 'description',
  price       : 1000,
  quantity    : 100
}

test('Positive: create product', async () => {
  const body = await createProduct(payload)

  expect(body).toEqual({
    ok   : true,
    data : {
      id          : expect.any(String),
      name        : payload.name,
      description : payload.description,
      price       : payload.price,
      quantity    : payload.quantity,
      links       : {
        category: {
          id   : payload.categoryId,
          type : 'category'
        }
      }
    }
  })
})

test('Negative: wrong categoryId', async () => {
  const body = await createProduct({
    ...payload,
    categoryId: '47b790d6-5068-472e-93d7-43bfb3bf0803'
  })

  expect(body).toEqual({
    ok    : false,
    error : {
      code    : 'WRONG_ID',
      message : 'category with this id not exist',
      fields  : { category: 'WRONG_ID' }
    }
  })
})

afterAll(() => sequelize.close())
