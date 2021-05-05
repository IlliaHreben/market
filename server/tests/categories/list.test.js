const factory = require('../testFactory')
const { sequelize } = require('../../lib/model')
const categories = require('../fixtures/categories.json')

let listCategories

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await factory.setDefaultCategories()
  await factory.setDefaultProducts()
  await factory.setDefaultUsers()
  const token = await factory.authUser()

  listCategories = (query = {}) => factory.list('/categories', token, query)
})

test('Positive: list categories', async () => {
  const body = await listCategories()

  expect(body.ok).toBeTrue()

  body.data.forEach(category => {
    const fixtureCategory = categories.find(({ id }) => id === category.id)

    expect(category).toEqual({
      id          : fixtureCategory.id,
      name        : fixtureCategory.name,
      description : fixtureCategory.description,
      price       : fixtureCategory.price,
      quantity    : fixtureCategory.quantity,
      links       : {}
    })
  })
})

afterAll(() => sequelize.close())
