const dumpProduct = product => {
  const included = {}
  if (product.Category) included.category = dumpCategory(product.Category)

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    ...included
  }
}

const dumpCategory = category => {
  const included = {}
  if (category.Products) included.products = category.Products.map(dumpProduct)

  return {
    id: category.id,
    name: category.name,
    ...included
  }
}

module.exports = { dumpProduct, dumpCategory }
