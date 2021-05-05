const factory = require('../testFactory')
const { sequelize } = require('../../lib/model')
const products = require('../fixtures/products.json')
const categories = require('../fixtures/categories.json')

let showProducts

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await factory.setDefaultCategories()
  await factory.setDefaultProducts()
  await factory.setDefaultUsers()
  const token = await factory.authUser()

  showProducts = (id, query) => factory.show(`/products/${id}`, token, query)
})

test('Positive: show product', async () => {
  const product = products[0]
  const category = categories.find(({ id }) => id === product.categoryId)
  const body = await showProducts(product.id, { include: 'Category' })

  expect(body.ok).toBeTrue()

  expect(body.data).toEqual({
    id          : product.id,
    name        : product.name,
    description : product.description,
    price       : product.price,
    quantity    : product.quantity,
    links       : {
      category: {
        type : 'category',
        id   : product.categoryId
      }
    }
  })

  expect(body.linked.Category).toEqual([ {
    id    : category.id,
    name  : category.name,
    links : {}
  } ])
})

afterAll(() => sequelize.close())
