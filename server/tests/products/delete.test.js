const factory = require('../testFactory')
const { sequelize } = require('../../lib/model')
const products = require('../fixtures/products.json')

let deleteProduct

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await factory.setDefaultCategories()
  await factory.setDefaultProducts()
  await factory.setDefaultUsers()
  const token = await factory.authUser()

  deleteProduct = id => factory.delete(`/products/${id}`, token)
})

test('Positive: delete product', async () => {
  const product = products[0]
  const body = await deleteProduct(product.id)

  expect(body).toEqual({
    ok   : true,
    data : {
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
    }
  })
})

test('Negative: product not exist', async () => {
  const body = await deleteProduct('47b790d6-5068-472e-93d7-43bfb3bf0803')

  expect(body).toEqual({
    ok    : false,
    error : {
      code    : 'WRONG_ID',
      message : 'product with this id not exist',
      fields  : { product: 'WRONG_ID' }
    }
  })
})

afterAll(() => sequelize.close())
