const factory = require('../testFactory')
const { sequelize } = require('../../lib/model')
const categories = require('../fixtures/categories.json')
const products = require('../fixtures/products.json')

let showProducts

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await factory.setDefaultCategories()
  await factory.setDefaultProducts()
  await factory.setDefaultUsers()
  const token = await factory.authUser()

  showProducts = (id, query) => factory.show(`/categories/${id}`, token, query)
})

// eslint-disable-next-line jest/no-disabled-tests
test.skip('Positive: show product', async () => {
  const category = categories[0]
  const filteredProducts = products.filter(({ categoryId }) => categoryId === category.id)
  const body = await showProducts(category.id, { include: 'Products' })

  expect(body.ok).toBeTrue()

  expect(body.data).toEqual({
    id    : category.id,
    name  : category.name,
    links : {
      products: filteredProducts.map(p => ({ type: 'product', id: p.id }))
    }
  })

  expect(body.linked.Products).toEqual([ {
    id    : category.id,
    name  : category.name,
    links : {}
  } ])
})

afterAll(() => sequelize.close())
