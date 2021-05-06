const factory       = require('../testFactory')
const { sequelize } = require('../../lib/model')
const categories    = require('../fixtures/categories.json')
const products      = require('../fixtures/products.json')

let showProduct

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await factory.setDefaultCategories()
  await factory.setDefaultProducts()
  await factory.setDefaultUsers()
  const token = await factory.authUser()

  showProduct = (id, query) => factory.show(`/categories/${id}`, token, query)
})

test('Positive: show product', async () => {
  const category = categories[0]
  const filteredProducts = products.filter(({ categoryId }) => categoryId === category.id)

  const body = await showProduct(category.id, { include: 'Products' })

  expect(body.ok).toBeTrue()

  expect(body.data).toEqual({
    id          : category.id,
    name        : category.name,
    description : category.description,
    price       : category.price,
    quantity    : category.quantity,
    links       : {
      products: filteredProducts.map(p => ({ type: 'product', id: p.id }))
    }
  })

  expect(body.linked.Products).toEqual(
    filteredProducts.map(product => ({
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
    }))
  )
})

test('Negative: show product', async () => {
  const category = categories[0]
  const filteredProducts = products.filter(({ categoryId }) => categoryId === category.id)

  const body = await showProduct(category.id, { include: 'Products' })

  expect(body.ok).toBeTrue()

  expect(body.data).toEqual({
    id          : category.id,
    name        : category.name,
    description : category.description,
    price       : category.price,
    quantity    : category.quantity,
    links       : {
      products: filteredProducts.map(p => ({ type: 'product', id: p.id }))
    }
  })

  expect(body.linked.Products).toEqual(
    filteredProducts.map(product => ({
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
    }))
  )
})

afterAll(() => sequelize.close())
