const factory = require('../testFactory')
const { sequelize } = require('../../lib/model')
const products = require('../fixtures/products.json')

let listProducts

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await factory.setDefaultCategories()
  await factory.setDefaultProducts()
  await factory.setDefaultUsers()
  const token = await factory.authUser()

  listProducts = query => factory.list('/products', token, query)
})

test('Positive: list products', async () => {
  const body = await listProducts({ limit: 5 })

  expect(body.ok).toBeTrue()
  expect(body.data).toHaveLength(5)

  body.data.forEach(product => {
    const fixtureProduct = products.find(({ id }) => id === product.id)

    expect(product).toEqual({
      id          : fixtureProduct.id,
      name        : fixtureProduct.name,
      description : fixtureProduct.description,
      price       : fixtureProduct.price,
      quantity    : fixtureProduct.quantity,
      links       : {
        category: {
          type : 'category',
          id   : fixtureProduct.categoryId
        }
      }
    })
  })
})

afterAll(() => sequelize.close())
