const Sequelize = require('sequelize')
const { db: config } = require('./config')

const sequelize = new Sequelize(
  config.name,
  config.user,
  config.password,
  {
    dialect: 'mysql',
    host: config.host,
    port: config.port,
    charset: 'utf8',
    logging: config.logging ? console.log : false
  }
)

const Product = sequelize.define('Products', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  categoryId: {
    type: Sequelize.UUID,
    references: { model: 'Categories', key: 'id' },
    allowNull: false
  }
}, {
  indexes: [
    { fields: ['name'] },
    { fields: ['categoryId'] }
  ]
})

const Category = sequelize.define('Categories', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  indexes: [
    { fields: ['name'] }
  ]
})

Product.belongsTo(Category, {
  as: 'Category',
  foreignKey: {
    name: 'categoryId',
    allowNull: false
  }
})
Category.hasMany(Product, {
  as: 'Products',
  foreignKey: {
    name: 'categoryId',
    allowNull: false
  },
  onDelete: 'restrict',
  onUpdate: 'cascade'
})

class DMX extends Error {
  constructor ({ message, code, fields }) {
    super(message || code)
    this.code = code
    this.fields = fields
  }
}

module.exports = { DMX, Category, Product, sequelize }
