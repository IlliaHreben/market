const factory = require('../testFactory')
const { sequelize } = require('../../lib/model')
const categories = require('../fixtures/categories.json')

let deleteCategory

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await factory.setDefaultCategories()
  await factory.setDefaultUsers()
  const token = await factory.authUser()

  deleteCategory = id => factory.delete(`/categories/${id}`, token)
})

test('Positive: delete category', async () => {
  const category = categories[0]
  const body = await deleteCategory(category.id)

  expect(body).toEqual({
    ok   : true,
    data : {
      id    : category.id,
      name  : category.name,
      links : {}
    }
  })
})

test('Negative: category not exist', async () => {
  const body = await deleteCategory('47b790d6-5068-472e-93d7-43bfb3bf0803')

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
