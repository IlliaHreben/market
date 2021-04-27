const dumpProduct = product => {
  const links = {}
  if (product.Category) {
    links.category = {
      id   : product.categoryId,
      type : 'category'
    }
  }

  return {
    id          : product.id,
    name        : product.name,
    description : product.description,
    price       : product.price,
    quantity    : product.quantity,
    links
  }
}

const dumpCategory = category => {
  const links = {}
  if (category.Products) {
    links.products = category.Products
      .map(product => ({ id: product.id, type: 'product' }))
  }

  return {
    id   : category.id,
    name : category.name,
    links
  }
}

const dumpUser = user => {
  return {
    id         : user.id,
    email      : user.email,
    firstName  : user.firstName,
    secondName : user.secondName
  }
}

module.exports = { dumpProduct, dumpCategory, dumpUser }
