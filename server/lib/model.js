const Sequelize           = require('sequelize')
const { db: config }      = require('./config')
const { encryptPassword } = require('./utils/passwordUtils')

const sequelize = new Sequelize(
  config.name,
  config.user,
  config.password,
  {
    dialect : 'mysql',
    host    : config.host,
    port    : config.port,
    charset : 'utf8',
    logging : config.logging ? console.log : false
  }
)

const Product = sequelize.define('Products', {
  id          : { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  name        : { type: Sequelize.STRING, allowNull: false },
  description : { type: Sequelize.STRING, allowNull: false },
  price       : { type: Sequelize.STRING, allowNull: false },
  quantity    : { type: Sequelize.INTEGER, allowNull: false },
  categoryId  : { type: Sequelize.UUID, references: { model: 'Categories', key: 'id' }, allowNull: false }
}, {
  indexes: [
    { fields: [ 'name' ] },
    { fields: [ 'categoryId' ] }
  ]
})

const Category = sequelize.define('Categories', {
  id   : { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  name : { type: Sequelize.STRING, allowNull: false }
}, {
  indexes: [
    { fields: [ 'name' ] }
  ]
})

const User = sequelize.define('Users', {
  id               : { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  email            : { type: Sequelize.STRING, allowNull: false, unique: true },
  firstName        : { type: Sequelize.STRING, defaultValue: '' },
  secondName       : { type: Sequelize.STRING, defaultValue: '' },
  passwordHash     : { type: Sequelize.STRING },
  sessionStartedAt : { type: Sequelize.DATE, allowNull: true },
  password         : {
    type: Sequelize.VIRTUAL,
    set (password) {
      if (password) {
        this.setDataValue('passwordHash', encryptPassword(password))
      }
    }
  }
}, {
  indexes: [
    {
      unique : true,
      fields : [ 'email' ]
    }
  ]
})

Product.belongsTo(Category, {
  as         : 'Category',
  foreignKey : {
    name      : 'categoryId',
    allowNull : false
  }
})
Category.hasMany(Product, {
  as         : 'Products',
  foreignKey : {
    name      : 'categoryId',
    allowNull : false
  },
  onDelete : 'restrict',
  onUpdate : 'cascade'
})

module.exports = { Category, Product, User, sequelize }
