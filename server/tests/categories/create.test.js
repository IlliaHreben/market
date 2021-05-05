const factory = require('../testFactory')
const { sequelize } = require('../../lib/model')

let createCategory

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await factory.setDefaultUsers()
  const token = await factory.authUser()

  createCategory = requestBody => factory.create('/categories', token, requestBody)
})

const payload = {
  name: 'name'
}

test('Positive: create category', async () => {
  const body = await createCategory(payload)

  expect(body).toEqual({
    ok   : true,
    data : {
      id    : expect.any(String),
      name  : payload.name,
      links : {}
    }
  })
})

afterAll(() => sequelize.close())
